import {
  Controller,
  Get,
  Inject,
  Next,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Public } from 'src/utils/constants';
import { GoogleAuthGuard } from './guards/google.auth.guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { AuthService } from './services/auth.service';
import * as cookie from 'cookie';
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
  async redirect(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const token = await (await this.authService.login(req.user)).access_token;
    res.cookie('auth_token', token, {
      maxAge: 60 * 60 * 2000,
      sameSite: 'none',
      secure: false,
    });
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', token, {
        maxAge: 60 * 60 * 2000,
        sameSite: 'none',
        secure: false,
      }),
    );
    console.log(token);
    console.log('sending cookies');
    res.redirect(process.env.FRONTEND_URL as string);
    next();
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.logOut();
    res.cookie('auth', '', { maxAge: 1000 });
    return res.status(200).send('Logged Out');
  }
}
