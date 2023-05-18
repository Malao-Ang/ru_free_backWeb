import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CalendersService } from './calenders.service';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';
import { Request } from 'express';

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

  @Post(':id')
  findOne(@Param('id') id: string, @Body() email:{email: string}) {
    // console.log(email);
    return this.calendersService.findOne(id,email.email);
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
  @Get('/email/:email')
  findCalenderByEmail(@Param('email') email: string) {
    return this.calendersService.findByEmail(email);
  }

  @Patch('/delete-member/:id')
  deleteMembers(
    @Param('id') id: string,
    @Body() updateCalenderDto: UpdateCalenderDto,
  ) {
    return this.calendersService.deleteMembers(id, updateCalenderDto);
  }
  @Get('/friend/:id')
  findFriendInCalender(@Param('id') id: string) {
    return this.calendersService.findFriendInCalender(+id);
  }
  @Patch('/join/:code')
  joinGroupByCode(
    @Param('code') code: string,
    @Body() updateCalenderDto: UpdateCalenderDto,
  ) {
    return this.calendersService.joinGroupByCode(code, updateCalenderDto);
  }

  @Get('/joined/:email')
  findCalenderMember(@Param('email') email: string) {
    return this.calendersService.findCalenderMember(email);
  }

  @Get('/code/:code')
  findCalenderByCode(@Param('code') code: string) {
    return this.calendersService.findCalenderByCode(code);
  }
}
