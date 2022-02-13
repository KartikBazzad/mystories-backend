import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoryPrismaService } from 'src/prisma/Services/stories.prisma.service';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

@Module({
  imports: [],
  controllers: [StoriesController],
  providers: [StoriesService, PrismaService, StoryPrismaService],
})
export class StoriesModule {}
