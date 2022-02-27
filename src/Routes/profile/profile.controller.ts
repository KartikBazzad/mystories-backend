import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/utils/constants';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
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
  @UseGuards(JwtAuthGuard)
  @Post('/:profileId/follow')
  async followNewUser(
    @Param('profileId') profileId: string,
    @Req() req: Request,
  ) {
    const { userId }: any = req.user;
    const follower = await this.profileService.followNewUser(userId, profileId);
    return follower ? 'User Followed' : 'User Does not Exist';
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:profileId/isfollowed')
  async checkUserForFollow(
    @Param('profileId') profileId: string,
    @Req() req: Request,
  ) {
    const { userId }: any = req.user;
    const userFollowed = await this.profileService.checkForFollow(
      userId,
      profileId,
    );
    return userFollowed ? true : false;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:profileId/unfollow')
  async unfollowUser(
    @Param('profileId') profileId: string,
    @Req() req: Request,
  ) {
    const { userId }: any = req.user;
    const unfollowedUser = await this.profileService.unfollowUser(
      userId,
      profileId,
    );
    return unfollowedUser ? 'User unfollowed' : 'Follower does not exist';
  }
}
