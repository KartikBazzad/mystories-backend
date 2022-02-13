import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StoryPrismaService {
  constructor(private readonly prisma: PrismaService) {}
  async findStory(where: Prisma.storiesWhereUniqueInput) {
    return await this.prisma.stories.findUnique({ where });
  }
  async createStory(data: Prisma.storiesCreateInput) {
    return await this.prisma.stories.create({ data });
  }
  async deleteStory(where: Prisma.storiesWhereUniqueInput) {
    return await this.prisma.stories.delete({ where });
  }
  async getAllStories() {
    return await this.prisma.stories.findMany();
  }
  async getAllUserStories(where: Prisma.storiesWhereInput) {
    return await this.prisma.stories.findMany({ where });
  }
}
