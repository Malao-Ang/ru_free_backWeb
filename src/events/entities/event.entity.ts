import { Calender } from 'src/calenders/entities/calender.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class _Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  display: string;
  @ManyToOne(()=> User,(user)=>user.events)
  user: User;
  @Column()
  color: string;
  @ManyToOne(()=> Calender,(car)=> car.events)
  calender:Calender
  @Column()
  freeStatus: boolean;

 
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;
}
