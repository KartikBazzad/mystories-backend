import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class UserPrismaService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(data: Prisma.UsersCreateInput) {
    return await this.prisma.users.create({ data });
  }
  async findUser(where: Prisma.UsersWhereUniqueInput) {
    return await this.prisma.users.findUnique({ where });
  }
  async getUserDetails(where: Prisma.UsersWhereUniqueInput) {
    return await this.prisma.users.findUnique({
      where,
      select: {
        email: false,
        stories: {
          include: {
            user: {
              select: {
                username: true,
                userId: true,
                photo: true,
              },
            },
          },
        },
        _count: {
          select: {
            followers: true,
            followedUser: true,
          },
        },
        userId: true,
        username: true,
        photo: true,
        googleId: false,
      },
    });
  }
  async updateUser(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }) {
    return await this.prisma.users.update(params);
  }
  async followNewUser(data: Prisma.followersCreateInput) {
    return await this.prisma.followers.create({ data });
  }
  async unfollowUser(where: Prisma.followersWhereInput) {
    const userTounfollow = await this.prisma.followers.findFirst({ where });
    return await this.prisma.followers.delete({
      where: { id: userTounfollow?.id },
    });
  }
  async findFollower(where: Prisma.followersWhereInput) {
    return await this.prisma.followers.findFirst({ where });
  }
}
