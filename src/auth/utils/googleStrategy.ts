import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
@Injectable()
export class googleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID:
        process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: 'https://rufreebackweb-production.up.railway.app/api/auth/google/redirect'|| 'http://localhost:3000/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      name: profile.displayName,
    });
    console.log('Validate');
    console.log(user);
    return {user,profile,accessToken} || null;
  }
}
