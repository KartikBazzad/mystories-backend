import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserPrismaService } from 'src/prisma/Services/users.prisma.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService, UserPrismaService],
})
export class ProfileModule {}
