import { Test, TestingModule } from '@nestjs/testing';
import { UserMembersCalenderController } from './user_members_calender.controller';
import { UserMembersCalenderService } from './user_members_calender.service';

describe('UserMembersCalenderController', () => {
  let controller: UserMembersCalenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMembersCalenderController],
      providers: [UserMembersCalenderService],
    }).compile();

    controller = module.get<UserMembersCalenderController>(UserMembersCalenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
