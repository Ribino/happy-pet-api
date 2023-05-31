import { Injectable } from '@nestjs/common';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SchedulingRepository {
  constructor(private prisma: PrismaService) {}

  async create(createSchedulingInput: Prisma.SchedulingCreateInput) {
    return await this.prisma.scheduling.create({
      data: createSchedulingInput,
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.scheduling.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.scheduling.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAllByClientId(clientId: number) {
    return await this.prisma.scheduling.findMany({
      where: {
        pet: {
          Client: {
            id: clientId,
          },
        },
      },
      select: {
        id: true,
        date: true,
        pet: {
          select: {
            id: true,
            imagePath: true,
            name: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
          },
        },
        professional: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: number, updateSchedulingDto: UpdateSchedulingDto) {
    return `This action updates a #${id} scheduling`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduling`;
  }
}
