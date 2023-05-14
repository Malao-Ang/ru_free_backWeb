import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMembersCalenderService } from './user_members_calender.service';
import { CreateUserMembersCalenderDto } from './dto/create-user_members_calender.dto';
import { UpdateUserMembersCalenderDto } from './dto/update-user_members_calender.dto';

@Controller('user-members-calender')
export class UserMembersCalenderController {
  constructor(private readonly userMembersCalenderService: UserMembersCalenderService) {}

  @Post()
  create(@Body() createUserMembersCalenderDto: CreateUserMembersCalenderDto) {
    return this.userMembersCalenderService.create(createUserMembersCalenderDto);
  }

  @Get()
  findAll() {
    return this.userMembersCalenderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMembersCalenderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMembersCalenderDto: UpdateUserMembersCalenderDto) {
    return this.userMembersCalenderService.update(+id, updateUserMembersCalenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMembersCalenderService.remove(+id);
  }
}
