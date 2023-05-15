import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from './entities/calender.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserMembersCalender } from 'src/user_members_calender/entities/user_members_calender.entity';

@Injectable()
export class CalendersService {
  constructor(
    @InjectRepository(Calender)
    private calenderRepository: Repository<Calender>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserMembersCalender)
    private uMCRepository: Repository<UserMembersCalender>,
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
    return this.calenderRepository.find({
      order: { createdDate: 'DESC' },
      relations: ['members'],
    });
  }

  async findOne(id: string) {
    const calender = await this.calenderRepository.findBy({ id: +id });
    if (!calender) {
      throw new NotFoundException();
    }
    return calender;
  }

  async findByEmail(email: string) {
    const calender = await this.calenderRepository.find({
      where: {
        owner: { email: email },
      },
      relations: ['events'],
    });
    if (!calender) {
      throw new NotFoundException('Not found email ' + email);
    }
    return calender;
  }

  async update(id: string, updateCalenderDto: UpdateCalenderDto) {
    const calender = await this.calenderRepository.findOneBy({ id: +id });
    if (!calender) {
      throw new NotFoundException();
    }
    updateCalenderDto.id = calender.id;
    const updatedCar = {
      ...calender,
      ...updateCalenderDto,
    };

    return this.calenderRepository.save(updatedCar);
  }

  async remove(id: string) {
    const calender = await this.calenderRepository.findOneBy({ id: +id });
    return this.calenderRepository.remove(calender);
  }
  async addMembers(id: string, updateCalenderDto: UpdateCalenderDto) {
    const calender = await this.calenderRepository.findOneBy({ id: +id });
    if (!calender) {
      throw new NotFoundException('Not found Calender with id ' + id);
    }
    // carete updated object
    const updatedMember = new Calender();

    updatedMember.id = calender.id;
    updatedMember.members = [];
    if (updateCalenderDto.members) {
      for (const member of updateCalenderDto.members) {
        const user = await this.userRepository.findOneBy({ email: member });
        if (user) {
          //check  repeatUser
          const repeatedUser = await this.uMCRepository.findOneBy({
            calender: { id: calender.id },
            user: { id: user.id },
          });
          console.log('User repeated', repeatedUser);
          if (!repeatedUser) {
            const umc = new UserMembersCalender();
            umc.user = user;
            umc.calender = calender;
            const umcSaved = await this.uMCRepository.save(umc);
            updatedMember.members.push(umcSaved);
          }
        }
      }
    }
    if (updatedMember.members.length > 0) {
      const updateCalenderMember = {
        ...calender,
        ...updatedMember,
      };
      console.log(updateCalenderMember);
      return this.calenderRepository.save(updateCalenderMember);
    }
  }

  async deleteMembers(id: string, updateCalenderDto: UpdateCalenderDto) {
    const calender = await this.calenderRepository.findOneBy({ id: +id });
    if (!calender) {
      throw new NotFoundException();
    }
    const umcs = await this.uMCRepository.find({
      where: { calender: { id: +calender.id } },
      relations: ['user'],
    });
    if (updateCalenderDto.members.length > 0) {
      for (const member of updateCalenderDto.members) {
        const index = umcs.find((umc) => umc.user.email === member);
        await this.uMCRepository.remove(index);
      }
    }
    // updatedMember.members = umcs;
    // const updateCalenderMember = {
    //   ...updatedMember,
    //   ...calender,
    // };
    return this.calenderRepository.findOne({
      where: { id: calender.id },
      relations: ['members', 'members.user'],
    });
  }

  async findFriendInCalender(calenderId: number) {
    const calender = await this.calenderRepository.findOne({
      where: { id: calenderId },
      relations: ['members.user'],
    });
    if (!calender) {
      throw new NotFoundException();
    }
    return calender;
  }

  async joinGroupByCode(
    groupCode: string,
    updateCalenderDto: UpdateCalenderDto,
  ) {
    const calender = await this.calenderRepository.findOne({
      where: { code: groupCode },
    });
    if (!calender) {
      throw new NotFoundException();
    }
    const updatedMember = new Calender();

    updatedMember.id = calender.id;
    updatedMember.members = [];
    if (updateCalenderDto.members) {
      for (const member of updateCalenderDto.members) {
        const user = await this.userRepository.findOneBy({ email: member });
        if (user) {
          //check  repeatUser
          const repeatedUser = await this.uMCRepository.findOneBy({
            calender: { id: calender.id },
            user: { id: user.id },
          });
          console.log('User repeated', repeatedUser);
          if (!repeatedUser) {
            const umc = new UserMembersCalender();
            umc.user = user;
            umc.calender = calender;
            const umcSaved = await this.uMCRepository.save(umc);
            updatedMember.members.push(umcSaved);
          }
        }
      }
    }
    if (updatedMember.members.length > 0) {
      const updateCalenderMember = {
        ...calender,
        ...updatedMember,
      };
      console.log(updateCalenderMember);
      return this.calenderRepository.save(updateCalenderMember);
    }
  }

  findCalenderMember(email: string) {
    const calender = this.calenderRepository.find({
      where: { members: { user: { email: email } } },
    });
    return calender;
  }
  findCalenderByCode(code: string) {
    const calender = this.calenderRepository.findOne({
      where: { code: code },
    });
    if (!calender) {
      throw new NotFoundException();
    }
    return calender;
  }
}
