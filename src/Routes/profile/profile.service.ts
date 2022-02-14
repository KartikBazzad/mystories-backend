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
}
