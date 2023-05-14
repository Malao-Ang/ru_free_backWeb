import { Test, TestingModule } from '@nestjs/testing';
import { UserMembersCalenderService } from './user_members_calender.service';

describe('UserMembersCalenderService', () => {
  let service: UserMembersCalenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMembersCalenderService],
    }).compile();

    service = module.get<UserMembersCalenderService>(UserMembersCalenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
