import { Calender } from 'src/calenders/entities/calender.entity';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  id?: number;
  name: string;
  email: string;
  calender?: Calender[];
  members?: User[];
}
