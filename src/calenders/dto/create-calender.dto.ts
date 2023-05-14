import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { _Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateCalenderDto {
  id?:string;
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  events?: _Event[];
  members?:[];
}
