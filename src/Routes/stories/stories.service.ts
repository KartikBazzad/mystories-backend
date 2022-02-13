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
