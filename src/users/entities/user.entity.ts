import { Calender } from "src/calenders/entities/calender.entity";
import { _Event } from "src/events/entities/event.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number ;

    @Column()
    email:string ;
    @Column()
    name:string ;
    @OneToMany(()=>Calender,(calender)=> calender.owner)
    calenders:Calender[]
    @ManyToMany(()=>Calender,(calender)=> calender.members)
    members: User[];
    @OneToMany(()=>_Event,(eve)=> eve.user)
    events:_Event[];
    
}
