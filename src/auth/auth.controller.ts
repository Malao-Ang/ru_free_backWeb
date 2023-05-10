import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import {Request} from 'express';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard )
  login() {
    return {msg:'login'};
  }
  
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect() {
    return {msg:'redirect'};
  }
  @Get('status')

  user(@Req() request: Request){
    console.log(request.user);
    console.log(request);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
