import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { StoriesService } from './stories.service';

@Controller('story')
export class StoriesController {
  constructor(private readonly storyService: StoriesService) {}
  @Get()
  async sayHello() {
    return 'Hello';
  }
  @Post('publish')
  @UseGuards(JwtAuthGuard)
  async newStory(@Req() req: Request, @Res() res: Response) {
    const { data } = req.body;
    const {
      title,
      caption,
      content,
      headingSize,
      contentSize,
      placement,
      background,
    } = data;
    const { userId }: any = req.user;
    const story = await this.storyService.saveToDatabase(
      title,
      caption,
      content,
      contentSize,
      background,
      placement,
      headingSize,
      userId,
    );
    return res.send({ story });
  }
}
