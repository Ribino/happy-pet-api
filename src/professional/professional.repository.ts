import { Injectable } from '@nestjs/common';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfessionalRepository {
  constructor(private prisma: PrismaService) {}

  async create(createProfissionalInput: Prisma.ProfessionalCreateInput) {
    return await this.prisma.professional.create({
      data: createProfissionalInput,
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.professional.findMany({
      include: {
        user: true,
        service: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.professional.findUnique({
      where: {
        id: id,
      },
      include: {
        availableTime: true,
        Scheduling: true,
        service: true,
      },
    });
  }

  async findByDateAndService(serviceId: number) {
    const professionals = await this.prisma.professional.findMany({
      where: {
        service: {
          some: {
            id: serviceId,
          },
        },
      },
      include: {
        user: true,
        availableTime: true,
        Scheduling: true,
      },
    });

    return professionals;
  }

  update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
    return `This action updates a #${id} professional`;
  }

  remove(id: number) {
    return `This action removes a #${id} professional`;
  }
}

// ,
//         Scheduling: {
//           none: {
//             date: {
//               getDay: dayOfWeek,
//             },
//             start: hour,
//             end: hour,
//           },
//         },
