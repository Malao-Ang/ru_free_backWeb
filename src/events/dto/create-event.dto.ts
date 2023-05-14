import { IsNotEmpty, MinLength } from "class-validator";

export class CreateEventDto {
 
    id?: string;
    title?: string;
    startDate?: Date;
    endDate?: Date;
    display?: string;
    color?: string;
    email?:string;
    idCalender?: string;
    freeStatus:boolean;
}
