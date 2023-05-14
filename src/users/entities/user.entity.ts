import { Calender } from 'src/calenders/entities/calender.entity';
import { _Event } from 'src/events/entities/event.entity';
import { UserMembersCalender } from 'src/user_members_calender/entities/user_members_calender.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  @Column()
  name: string;
  @OneToMany(() => Calender, (calender) => calender.owner)
  calenders: Calender[];
  @OneToMany(() => UserMembersCalender, (userMembersCalender) => userMembersCalender.user)
  members: UserMembersCalender[];
  @OneToMany(() => _Event, (eve) => eve.user)
  events: _Event[];
}
