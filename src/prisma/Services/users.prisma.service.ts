import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class UserPrismaService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(data: Prisma.UsersCreateInput) {
    return await this.prisma.users.create({ data });
  }
  async findUser(where: Prisma.UsersWhereUniqueInput) {
    return await this.prisma.users.findUnique({ where });
  }
  async updateUser(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }) {
    return await this.prisma.users.update(params);
  }
}
