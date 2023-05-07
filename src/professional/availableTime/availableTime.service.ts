import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AvailableTimeRepository } from './availableTime.repository';
import { CreateAvailableTimeDto } from '../dto/create-availableTime.dto';

@Injectable()
export class AvailableTimeService {
  constructor(private availableTimeRepository: AvailableTimeRepository) {}

  async create(createAvailableTimeDto: CreateAvailableTimeDto) {
    const availableTimeCreateInput: Prisma.AvailableTimeCreateInput = {
      exceptionsDate : createAvailableTimeDto.exceptionDate,
      professional: {
        connect: {
          id: createAvailableTimeDto.professionalId,
        },
      },
      sunday: createAvailableTimeDto.sunday,
      monday: createAvailableTimeDto.monday,
      tuesday: createAvailableTimeDto.tuesday,
      wednesday: createAvailableTimeDto.wednesday,
      thursday: createAvailableTimeDto.thursday,
      friday: createAvailableTimeDto.friday,
      saturday: createAvailableTimeDto.saturday,
    };

    return await this.availableTimeRepository.create(
      availableTimeCreateInput,
    );
  }

  async findOne(id: number) {
    return await this.availableTimeRepository.findOne(id);
  }
}
