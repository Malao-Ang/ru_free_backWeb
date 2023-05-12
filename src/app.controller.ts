import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './auth/utils/Guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('about')
  @UseGuards(GoogleAuthGuard)
  getAbout() {
    return { msg: 'About' };
  }
}
