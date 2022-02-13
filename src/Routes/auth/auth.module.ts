import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserPrismaService } from 'src/prisma/Services/users.prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './strategy/google.auth.strategy';
import { JwtStrategy } from './strategy/jwt.auth.strategy';
import { SessionSerializer } from './strategy/sessionSeralizer.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JSON_WEBTOKEN_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    GoogleStrategy,
    JwtStrategy,
    SessionSerializer,
    PrismaService,
    UserPrismaService,
  ],
})
export class AuthModule {}
