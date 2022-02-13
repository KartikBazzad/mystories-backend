import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './Routes/auth/auth.module';
import { JwtAuthGuard } from './Routes/auth/guards/jwt.auth.guard';
import { StoriesModule } from './Routes/stories/stories.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    StoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
