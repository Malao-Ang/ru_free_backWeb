import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { CalendersModule } from './calenders/calenders.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'urfree',
      password: 'pass1234',
      database: 'rufree',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    PassportModule.register({session: true}),
    CalendersModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
