import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from 'src/utils/constants';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { StoriesService } from './stories.service';

@Controller('story')
export class StoriesController {
  constructor(private readonly storyService: StoriesService) {}
  @Public()
  @Get('all')
  async sendAllStories() {
    const stories = await this.storyService.findAllStories();
    return stories;
  }
  @Post('publish')
  @UseGuards(JwtAuthGuard)
  async newStory(@Req() req: Request, @Res() res: Response) {
    const { data } = req.body;
    const { userId }: any = req.user;
    const story = await this.storyService.saveToDatabase(data, userId);
    return res.send({ story });
  }
  @Public()
  @Get('/:storyId/details')
  async getStoryDetails(@Param('storyId') storyId: string) {
    const story = await this.storyService.findStory(storyId);
    return story;
  }
  @Public()
  @Get('/:storyId/likes')
  async getStoryLikes(@Param('storyId') storyId: string) {
    const story = await this.storyService.findStory(storyId);
    return { storyLike: story?._count.storyLike || 0, id: story?.id };
  }
  @Get('/:storyId/isliked')
  @UseGuards(JwtAuthGuard)
  async checkstorylike(@Param('storyId') storyId: string, @Req() req: Request) {
    const { userId }: any = req.user;
    const isLiked = await this.storyService.findLike(userId, storyId);
    return isLiked ? { id: isLiked.id, liked: true } : { liked: false };
  }
  @Post('/:storyId/like')
  @UseGuards(JwtAuthGuard)
  async updateStoryLike(
    @Param('storyId') storyId: string,
    @Req() req: Request,
  ) {
    const { userId }: any = req.user;
    const storyLikes = await this.storyService.updateLikes(storyId, userId);
    return storyLikes;
  }
  @Delete('/:storyId/dislike')
  @UseGuards(JwtAuthGuard)
  async updateStoryLikes(
    @Param('storyId') storyId: string,
    @Req() req: Request,
  ) {
    const { userId }: any = req.user;
    const storyLikes = await this.storyService.deleteLike(storyId, userId);
    return storyLikes;
  }
}
