import { Calender } from "src/calenders/entities/calender.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserMembersCalender {
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=> User,(user)=>user.members)
    user:User;
    @ManyToOne(()=> Calender,(calen)=>calen.members)
    calender:Calender;


}
