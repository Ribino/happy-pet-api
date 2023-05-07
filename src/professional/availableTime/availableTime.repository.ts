import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AvailableTimeRepository {
  constructor(private prisma: PrismaService) {}

  create(createAvailableTimeDto: Prisma.AvailableTimeCreateInput) {
    return this.prisma.availableTime.create({
      data: createAvailableTimeDto,
      select: {
        id: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.availableTime.findUnique({
      where: {
        professionalId: id,
      },
    });
  }
}
