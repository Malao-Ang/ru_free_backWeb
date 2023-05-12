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
        '593588518556-laoh0qf29n6kr4ag2835t62ruspm6mom.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
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
