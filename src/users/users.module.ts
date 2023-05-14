import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calender } from 'src/calenders/entities/calender.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Calender,User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersModule]
})
export class UsersModule {}
