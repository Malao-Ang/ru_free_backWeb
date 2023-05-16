import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Calender } from 'src/calenders/entities/calender.entity';
import { _Event } from './entities/event.entity';

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
    _event.start = new Date(createEventDto.start);

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

}
