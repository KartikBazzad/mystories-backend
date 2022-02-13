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

  async saveToDatabase(
    title: string,
    caption: string,
    content: string,
    contentSize: string,
    background: string,
    placement: string,
    headingSize: string,
    userId: string,
  ) {
    try {
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
