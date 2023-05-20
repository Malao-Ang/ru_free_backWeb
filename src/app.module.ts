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
import { Calender } from './calenders/entities/calender.entity';
import { _Event } from './events/entities/event.entity';
import { UserMembersCalender } from './user_members_calender/entities/user_members_calender.entity';
import { UserMembersCalenderModule } from './user_members_calender/user_members_calender.module';
import { env } from 'process'
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot() ,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NAME,
      port: parseInt(process.env.APP_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASENAME,
      entities: [User,Calender,_Event,UserMembersCalender],
      synchronize: true,
    }),
    UsersModule,
    PassportModule.register({session: true}),
    CalendersModule,
    EventsModule,
    UserMembersCalenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
