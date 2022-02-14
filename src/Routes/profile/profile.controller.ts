import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/utils/constants';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Public()
  @Get()
  sayHello() {
    return 'Hello';
  }
  @Public()
  @Get('/:userId')
  async getUserProfile(@Param('userId') userId: string) {
    const profile = await this.profileService.getUserProfile(userId);
    return profile;
  }
}
