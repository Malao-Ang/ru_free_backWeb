import { Injectable } from '@nestjs/common';
import { CreateUserMembersCalenderDto } from './dto/create-user_members_calender.dto';
import { UpdateUserMembersCalenderDto } from './dto/update-user_members_calender.dto';

@Injectable()
export class UserMembersCalenderService {
  create(createUserMembersCalenderDto: CreateUserMembersCalenderDto) {
    return 'This action adds a new userMembersCalender';
  }

  findAll() {
    return `This action returns all userMembersCalender`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMembersCalender`;
  }

  update(id: number, updateUserMembersCalenderDto: UpdateUserMembersCalenderDto) {
    return `This action updates a #${id} userMembersCalender`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMembersCalender`;
  }
}
