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

    if (!calender) {
      throw new NotFoundException();
    }
    if (!user) {
      throw new NotFoundException();
    }
    return this.calenderRepository.save(_event);
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
