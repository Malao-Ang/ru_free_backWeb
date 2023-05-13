import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from './entities/calender.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalendersService {
  constructor(
    @InjectRepository(Calender)
    private calenderRepository: Repository<Calender>,
  ) {}
  async create(createCalenderDto: CreateCalenderDto) {
    return await this.calenderRepository.create(createCalenderDto);
  }

  findAll() {
    return this.calenderRepository.find();
  }

  async findOne(id: string) {
    const calender = await this.calenderRepository.findBy({ id: id });
    if (!calender) {
      throw new NotFoundException();
    }
    return calender;
  }

  async update(id: string, updateCalenderDto: UpdateCalenderDto) {
    const calender = await this.calenderRepository.findBy({ id: id });
    if (!calender) {
      throw new NotFoundException();
    }
    const updatedCalenderDto = {
      ...calender,
      ...updateCalenderDto,
    };
    return this.calenderRepository.save(updatedCalenderDto);
  }

  async remove(id: string) {
    const calender = await this.calenderRepository.findBy({ id: id });
    return this.calenderRepository.remove(calender);
  }
}
