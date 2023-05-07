import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ProfessionalRepository } from './professional.repository';
import { CreateAvailableTimeDto } from './dto/create-availableTime.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfessionalService {
  constructor(private professionalRepository: ProfessionalRepository) {}

  async create(createProfessionalDto: CreateProfessionalDto) {
    try {
      const professionalCreateInput: Prisma.ProfessionalCreateInput = {
        user: {
          connect: {
            id: createProfessionalDto.userId,
          },
        },
      };
      return await this.professionalRepository.create(professionalCreateInput);
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
    return await this.professionalRepository.findAll();
  }

  async findOne(id: number) {
    return await this.professionalRepository.findOne(id);
  }

  update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
    return `This action updates a #${id} professional`;
  }

  remove(id: number) {
    return `This action removes a #${id} professional`;
  }

}
