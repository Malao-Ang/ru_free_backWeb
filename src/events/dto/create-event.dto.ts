import { IsNotEmpty, MinLength } from "class-validator";

export class CreateEventDto {
 
    id?:  number;
    title?: string;
    startDate?: Date;
    endDate?: Date;
    display?: string;
    color?: string;
    email?:string;
    idCalender?: string;
    freeStatus:boolean;
}
