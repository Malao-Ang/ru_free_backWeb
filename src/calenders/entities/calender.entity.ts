import { _Event } from 'src/events/entities/event.entity';
import { UserMembersCalender } from 'src/user_members_calender/entities/user_members_calender.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Calender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @ManyToOne(() => User, (user) => user.calenders, null)
  owner: User;

  @OneToMany(() => UserMembersCalender, (umc) => umc.calender)
  members: UserMembersCalender[];

  @OneToMany(() => _Event, (eve) => eve.calender, null)
  events: _Event[];
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;
}
