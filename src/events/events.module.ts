import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _Event } from './entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import { Calender } from 'src/calenders/entities/calender.entity';

@Module({
  imports:[TypeOrmModule.forFeature([_Event,User,Calender])],

  controllers: [EventsController],
  providers: [EventsService],
  
})
export class EventsModule {}
