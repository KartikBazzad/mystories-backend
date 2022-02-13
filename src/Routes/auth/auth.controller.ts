import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from 'src/utils/constants';
import { GoogleAuthGuard } from './guards/google.auth.guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {}
  @Public()
  @Get('login')
  @UseGuards(GoogleAuthGuard)
  async userLogin() {
    return;
  }
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('redirect')
  async redirect(@Req() req: Request, @Res() res: Response) {
    const token = await (await this.authService.login(req.user)).access_token;
    res.cookie('auth', token, { maxAge: 60 * 60 * 2000 });
    return res.redirect('http://localhost:3000');
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}