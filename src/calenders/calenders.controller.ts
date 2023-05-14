import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CalendersService } from './calenders.service';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';

@Controller('calenders')
export class CalendersController {
  constructor(private readonly calendersService: CalendersService) {}

  @Post()
  create(@Body() createCalenderDto: CreateCalenderDto) {
    return this.calendersService.create(createCalenderDto);
  }

  @Get()
  findAll() {
    return this.calendersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalenderDto: UpdateCalenderDto,
  ) {
    return this.calendersService.update(id, updateCalenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendersService.remove(id);
  }

  @Patch('/update-member/:id')
  addMembers(
    @Param('id') id: string,
    @Body() updateCalenderDto: UpdateCalenderDto,
  ) {
    return this.calendersService.addMembers(id, updateCalenderDto);
  }

  @Patch('/delete-member/:id')
  deleteMembers(
    @Param('id') id: string,
    @Body() updateCalenderDto: UpdateCalenderDto,
  ) {
    return this.calendersService.deleteMembers(id, updateCalenderDto);
  }
}
