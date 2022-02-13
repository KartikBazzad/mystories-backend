import { Injectable } from '@nestjs/common';
import { UserPrismaService } from 'src/prisma/Services/users.prisma.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserPrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async validate(userId) {
    const user = await this.userService.findUser({ googleId: userId });
    return user;
  }
  async createUser({ userId, username, email, photo, googleId }) {
    const user = await this.userService.createUser({
      userId,
      username,
      email,
      photo,
      googleId,
    });
    return user;
  }
  async updateUser({ userId, photo, username }) {
    const user = await this.userService.updateUser({
      where: { userId },
      data: {
        photo,
        username,
      },
    });
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
