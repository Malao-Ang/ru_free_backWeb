import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _Event } from './entities/event.entity';

@Module({
  imports:[TypeOrmModule.forFeature([_Event])],

  controllers: [EventsController],
  providers: [EventsService],
  
})
export class EventsModule {}
