import { Injectable } from '@nestjs/common';
import { UserPrismaService } from 'src/prisma/Services/users.prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly usersPrismaService: UserPrismaService) {}
  sayHello() {
    return 'Hello';
  }
  async getUserProfile(userId: string) {
    const userProfile = await this.usersPrismaService.getUserDetails({
      userId,
    });
    return userProfile;
  }
  async followNewUser(userId: string, profileId: string) {
    const follower = await this.usersPrismaService.followNewUser({
      follower: {
        connect: {
          userId: userId,
        },
      },
      user: {
        connect: {
          userId: profileId,
        },
      },
    });
    return follower;
  }
  async checkForFollow(followerId: string, profileId: string) {
    const follower = await this.usersPrismaService.findFollower({
      userId: profileId,
      followerId: followerId,
    });
    return follower;
  }
  async unfollowUser(userId: string, profileId: string) {
    const unfollowUser = await this.usersPrismaService.unfollowUser({
      followerId: userId,
      userId: profileId,
    });
    return unfollowUser;
  }
}
