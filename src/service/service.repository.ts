import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceRepository {
  constructor(private prisma: PrismaService) {}

  async create(createServiceInput: Prisma.ServiceCreateInput) {
    return await this.prisma.service.create({
      data: createServiceInput,
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.service.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.service.findUnique({
      where: {
        id: id,
      },
      include: {
        professional: true,
        Scheduling: true,
      },
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
