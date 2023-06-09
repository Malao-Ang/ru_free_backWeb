import { Module } from '@nestjs/common';
import { CalendersService } from './calenders.service';
import { CalendersController } from './calenders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Calender } from './entities/calender.entity';
import { UserMembersCalender } from 'src/user_members_calender/entities/user_members_calender.entity';
import { _Event } from 'src/events/entities/event.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Calender,UserMembersCalender,_Event])],
  controllers: [CalendersController,],
  providers: [CalendersService],
  exports: [CalendersModule]
})
export class CalendersModule {}
