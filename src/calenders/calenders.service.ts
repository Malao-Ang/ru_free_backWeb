import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from './entities/calender.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CalendersService {
  constructor(
    @InjectRepository(Calender)
    private calenderRepository: Repository<Calender>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createCalenderDto: CreateCalenderDto) {
    try {
      const user = await this.userRepository.findOneBy({
        email: createCalenderDto.email,
      });
      if (!user) {
        throw new NotFoundException();
      }
      const calender = new Calender();
      calender.name = createCalenderDto.name;
      calender.owner = user;
      if (createCalenderDto.events && createCalenderDto.members) {
        calender.events = createCalenderDto.events;
        calender.members = createCalenderDto.members;
      }

      const car = this.calenderRepository.save(calender);
      // console.log(car);
      return car;
    } catch (e) {
      console.log(e);
    }
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

  async findByEmail(email: string) {
    const calender = await this.calenderRepository.findBy({
      owner: { email: email },
    });
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
    const updatedCar = {
      ...calender,
      ...updateCalenderDto,
    };

    return this.calenderRepository.save(updatedCar);
  }

  async remove(id: string) {
    const calender = await this.calenderRepository.findBy({ id: id });
    return this.calenderRepository.remove(calender);
  }
  async addMembers(id: string, updateCalenderDto: UpdateCalenderDto) {
    const calender = await this.calenderRepository.findBy({ id: id });
    if (!calender) {
      throw new NotFoundException();
    }
    // carete updated object
    const updatedMember = new Calender();

    if (updateCalenderDto.members.length > 0) {
      for (const member of updateCalenderDto.members) {
        const user = await this.userRepository.findOne({
          where: { email: member },
        });
        if (user) {
          updatedMember.members.push(user);
        }
      }
    }
    const updateCalenderMember = {
      ...calender,
      ...updatedMember,
    };
    return this.calenderRepository.save(updateCalenderMember);
  }
}
