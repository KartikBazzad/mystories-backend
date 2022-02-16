import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StoryPrismaService {
  constructor(private readonly prisma: PrismaService) {}
  async findStory(where: Prisma.storiesWhereUniqueInput) {
    return await this.prisma.stories.findUnique({
      where,
      include: {
        user: {
          select: { username: true, userId: true, photo: true },
        },
      },
    });
  }
  async createStory(data: Prisma.storiesCreateInput) {
    return await this.prisma.stories.create({
      data,
      include: {
        user: {
          select: {
            username: true,
            userId: true,
            photo: true,
          },
        },
      },
    });
  }
  async deleteStory(where: Prisma.storiesWhereUniqueInput) {
    return await this.prisma.stories.delete({ where });
  }
  async getAllStories() {
    return await this.prisma.stories.findMany({
      orderBy: {
        createdOn: 'desc',
      },
      include: {
        user: {
          select: {
            username: true,
            userId: true,
            photo: true,
          },
        },
      },
    });
  }
  async getAllUserStories(where: Prisma.storiesWhereInput) {
    return await this.prisma.stories.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
            userId: true,
            photo: true,
          },
        },
      },
    });
  }
}
