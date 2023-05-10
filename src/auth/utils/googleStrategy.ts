import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
@Injectable()
export class googleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '593588518556-laoh0qf29n6kr4ag2835t62ruspm6mom.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }
  validate(
    accessToken: string,
    refeshToken: string,
    profile: Profile,

  ) {
    console.log('validate', accessToken, refeshToken, profile);
  }
}
