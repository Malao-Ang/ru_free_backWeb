import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { googleStrategy } from './utils/googleStrategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,googleStrategy],
})
export class AuthModule {}
