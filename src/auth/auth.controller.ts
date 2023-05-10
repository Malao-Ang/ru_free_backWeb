import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';


@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard )
  login() {
    return 'login';
  }
  
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect() {
    return 'redirect';
  }
}
