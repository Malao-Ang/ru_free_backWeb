import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateCalenderDto } from 'src/calenders/dto/update-calender.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
  @Get('calender/:id')
  findEventByCalender(@Param('id') id: string) {
    // return this.eventsService.findEventByCalender(id);
    return this.eventsService.findEventByIdCalender(+id);
  }
  @Post('date/:id')
  findEventsByDate(@Param('id') id: string,@Body() updateCalenderDto:UpdateCalenderDto) {
    return this.eventsService.findEventsByDate(id,updateCalenderDto)
  }
}
