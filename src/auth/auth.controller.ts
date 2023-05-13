import {
  Controller,
  Get,
  NotFoundException,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return;
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() request: Request,@Res() response: Response) {
    
    // // const user = request.user;
    // let email, name, picture;
    // if ('emails' in request.user) {
    //   email = request.user.emails[0].value;
    // }
    // if ('displayName' in request.user) {
    //   name = request.user.displayName;
    // }
    // if ('photos' in request.user && request.user['photos']) {
    //   picture = request.user.photos[0].val;
    // }
    console.log("request.user")
    console.log(request.user)
    // return request.user['profile']
    response.redirect(
      `http://localhost:8080/homepage/?email=${request.user['profile']['emails'][0]['value']}&name=${request.user['profile']['displayName']}&picture=${request.user['profile']['photos'][0]['value']}&token=${request.user['accessToken']}`,
    );
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return request.user;
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
