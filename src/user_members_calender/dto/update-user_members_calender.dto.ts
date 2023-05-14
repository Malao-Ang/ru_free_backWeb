import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMembersCalenderDto } from './create-user_members_calender.dto';

export class UpdateUserMembersCalenderDto extends PartialType(CreateUserMembersCalenderDto) {}
