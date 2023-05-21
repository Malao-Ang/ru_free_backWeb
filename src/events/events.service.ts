import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Raw, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Calender } from 'src/calenders/entities/calender.entity';
import { _Event } from './entities/event.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Calender)
    private calenderRepository: Repository<Calender>,
    @InjectRepository(_Event)
    private eventRepository: Repository<_Event>,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const date_ = new Date(createEventDto.start).toISOString().split('T')[0];
    const eve = await this.eventRepository.findOne({
      where: {
        user: { email: createEventDto.email },
        start: date_,
        calender: { id: createEventDto.idCalender },
      },
      relations: ['user'],
    });

    if (eve) {
      eve.freeStatus = createEventDto.freeStatus;
      return this.eventRepository.save(eve);
    }

    const calender = await this.calenderRepository.findOneBy({
      id: createEventDto.idCalender,
    });
    const user = await this.userRepository.findOneBy({
      email: createEventDto.email,
    });
    const _event = new _Event();
    _event.calender = calender;
    _event.color = createEventDto.color;
    _event.display = createEventDto.display;
    _event.freeStatus = createEventDto.freeStatus;
    _event.title = createEventDto.title;
    _event.user = user;
    _event.start = new Date(createEventDto.start).toISOString().split('T')[0];

    if (!calender) {
      throw new NotFoundException();
    }
    if (!user) {
      throw new NotFoundException();
    }
    return this.eventRepository.save(_event);
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} event`;
  }
  async findEventByCalender(idCar: string) {
    const calenderEvents = await this.calenderRepository.findOneBy({
      id: +idCar,
    });
    if (!calenderEvents) {
      throw new NotFoundException();
    }

    return calenderEvents.events;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOneBy({ id: +id });
    if (!event) {
      throw new NotFoundException();
    }
    const updatedEvent = {
      ...event,
      ...updateEventDto,
    };
    return this.eventRepository.save(updatedEvent);
  }

  async remove(id: string) {
    const event = await this.eventRepository.findOneBy({ id: +id });
    if (!event) {
      throw new NotFoundException();
    }
    return this.eventRepository.remove(event);
  }
  async findEventByIdCalender(id: number) {
    try {
      const events = await this.eventRepository.find({
        where: { calender: { id: id } },
      });
      return events;
    } catch (e) {
      console.log(e);
    }
  }

  async findEventsByDate(id:string,updateEventDto: UpdateEventDto) {
    try {
      const date_ = new Date(updateEventDto.start).toISOString().split('T')[0];
      const eve = await this.eventRepository.find({
        where: {
          start: date_,
          calender: { id: +id },
        },
        relations: ['user'],
      });

      return eve;
    } catch (e) {
      console.log(e);
    }
  }
  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async deleteOldEvent() {
    const date_ = new Date();
    const year = date_.getFullYear();
    const month = String(date_.getMonth() + 1).padStart(2, '0');
    const day = String(date_.getDate() - 1).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    // console.log("Hello");.
    const events = await this.eventRepository.find({
      where: { start: formattedDate },
    });
    for (const event of events) {
      await this.eventRepository.remove(event);
      console.log(event);
    }
    console.log('delete completed');
  }
}
