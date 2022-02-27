import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { StoryPrismaService } from 'src/prisma/Services/stories.prisma.service';
import { customAlphabet, nanoid } from 'nanoid';
const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
@Injectable()
export class StoriesService {
  constructor(private readonly storiesPrismaService: StoryPrismaService) {}
  sayHello() {
    return 'Hello';
  }
  async findStory(storyId) {
    const story = await this.storiesPrismaService.findStory({ storyId });
    return story;
  }
  async findAllStories() {
    return await this.storiesPrismaService.getAllStories();
  }
  async findLike(userId, storyId) {
    const storyLike = await this.storiesPrismaService.findLike({
      userId,
      storyId,
    });
    return storyLike;
  }

  async updateLikes(storyId, userId) {
    const story = await this.storiesPrismaService.createLikes({
      story: {
        connect: {
          storyId,
        },
      },
      user: {
        connect: {
          userId,
        },
      },
    });
    return story;
  }
  async deleteLike(storyId, userId) {
    const story = await this.storiesPrismaService.findLike({ userId, storyId });
    const deleteStory = await this.storiesPrismaService.deleteLike({
      id: story?.id,
    });
    return 'deleted';
  }

  async saveToDatabase(data, userId) {
    try {
      const {
        title,
        caption,
        content,
        headingSize,
        contentSize,
        placement,
        background,
      } = data;
      const storyId = customAlphabet(alphabet, 18);
      const story = await this.storiesPrismaService.createStory({
        title,
        caption,
        storyId: storyId(),
        content,
        background,
        contentSize,
        placement,
        headingSize,
        user: { connect: { userId } },
      });
      return story;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
