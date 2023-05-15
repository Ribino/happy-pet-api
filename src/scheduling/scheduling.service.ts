import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { SchedulingRepository } from './scheduling.repository';

@Injectable()
export class SchedulingService {
  constructor(private schedulingRepository: SchedulingRepository) {}

  async create(CreateSchedulingDto: CreateSchedulingDto) {
    try {
      const createSchedulingInput: Prisma.SchedulingCreateInput = {
        date: new Date(CreateSchedulingDto.date),
        start: CreateSchedulingDto.start,
        professional: {
          connect: {
            id: CreateSchedulingDto.professionalId,
          },
        },
        pet: {
          connect: {
            id: CreateSchedulingDto.petId,
          },
        },
        service: {
          connect: {
            id: CreateSchedulingDto.serviceId,
          },
        },
        end: CreateSchedulingDto.end,
      };

      return await this.schedulingRepository.create(createSchedulingInput);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException({
          message: 'Já existe valor para estes campos cadastrado no sistema',
          fields: error.meta.target,
        });
      }

      throw new InternalServerErrorException({
        message: error.message,
        statusCode: 500, 
        error: 'Internal Server Error', 
      });
    }
  }

  async findAll() {
    return await this.schedulingRepository.findAll();
  }

  async findOne(id: number) {
    return await this.schedulingRepository.findOne(id);
  }

  update(id: number, updateSchedulingDto: UpdateSchedulingDto) {
    return `This action updates a #${id} scheduling`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduling`;
  }
}
