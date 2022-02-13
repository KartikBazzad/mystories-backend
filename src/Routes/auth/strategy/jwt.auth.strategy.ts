import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserPrismaService } from 'src/prisma/Services/users.prisma.service';
import { AuthService } from '../services/auth.service';
config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserPrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JSON_WEBTOKEN_SECRET,
    });
  }
  async validate(payload: any) {
    console.log(payload);
    const findUser = await this.userService.findUser({
      userId: payload.userId,
    });
    console.log(findUser);
    return findUser
      ? {
          userId: payload.userId,
          username: payload.username,
          photo: findUser.photo,
        }
      : 'Not Authenticated';
  }
}
