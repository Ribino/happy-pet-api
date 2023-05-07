import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './service.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private serviceRepository: ServiceRepository) {}

  async create(createServiceDto: CreateServiceDto) {
    try {
      const createServiceInput: Prisma.ServiceCreateInput = {
        name: createServiceDto.name,
        price: createServiceDto.price,
        time: createServiceDto.time,
        serviceType: createServiceDto.serviceType,
      };

      return await this.serviceRepository.create(createServiceInput);
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
    return await this.serviceRepository.findAll();
  }

  async findOne(id: number) {
    return await this.serviceRepository.findOne(id);
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
