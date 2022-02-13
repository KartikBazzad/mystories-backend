import {
  Body,
  Controller,
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
}
