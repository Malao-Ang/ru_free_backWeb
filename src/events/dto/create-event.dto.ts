import { IsNotEmpty, MinLength } from "class-validator";

export class CreateEventDto {
    id?: string;
    @IsNotEmpty()
    @MinLength(3)
    title: string;
    @IsNotEmpty()
    startDate: Date;
    @IsNotEmpty()
    endDate: Date;
    @IsNotEmpty()
    display: string;
    @IsNotEmpty()
    color: string;
}
