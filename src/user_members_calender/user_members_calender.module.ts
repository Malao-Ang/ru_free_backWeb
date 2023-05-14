import { Module } from '@nestjs/common';
import { UserMembersCalenderService } from './user_members_calender.service';
import { UserMembersCalenderController } from './user_members_calender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMembersCalender } from './entities/user_members_calender.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserMembersCalender])],
  controllers: [UserMembersCalenderController],
  providers: [UserMembersCalenderService]
})
export class UserMembersCalenderModule {}
