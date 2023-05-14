import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  id?: number;
  @IsString()
  title?: string;
  startDate?: Date;
  endDate?: Date;
  @IsString()
  display?: string;
  @IsString()
  color?: string;
  @IsEmail()
  email?: string;
  @IsNumber()
  idCalender?: number;
  @IsBoolean()
  freeStatus: boolean;
}
