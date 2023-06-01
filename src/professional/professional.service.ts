import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ProfessionalRepository } from './professional.repository';
import { Prisma } from '@prisma/client';
import { GetDayOfWeekAndTime } from '../common/helper';
import { DateTime } from 'luxon';

@Injectable()
export class ProfessionalService {
  constructor(private professionalRepository: ProfessionalRepository) {}

  async create(createProfessionalDto: CreateProfessionalDto) {
    try {
      const serviceIds = createProfessionalDto.serviceIds || [];
      const professionalCreateInput: Prisma.ProfessionalCreateInput = {
        user: {
          connect: {
            id: createProfessionalDto.userId,
          },
        },
      };
      if (serviceIds.length > 0) {
        professionalCreateInput.service = {
          connect: serviceIds.map((serviceId) => ({ id: serviceId })),
        };
      }
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

  async findByDateAndService(serviceId: number, date: string) {
    const dateTime = new Date(`${date}`);

    const { dayOfWeek } = GetDayOfWeekAndTime(dateTime);

    const professionals =
      await this.professionalRepository.findByDateAndService(serviceId);

    const currentDate = DateTime.local()
      .setZone('America/Sao_Paulo')
      .toJSDate();

    const currentDayOfWeek = currentDate
      .toLocaleString('en-US', {
        weekday: 'long',
      })
      .toLowerCase();

    const currentHour = currentDate.getHours();

    const filteredProfessionals = professionals.map((professional) => {
      const { availableTime, ...rest } = professional;
      const availableTimeForDay = availableTime[dayOfWeek] || [];

      let filteredAvailableTimeForDay = availableTimeForDay;

      const scheduledTimesForDay = professional.Scheduling.filter(
        (scheduling) => {
          const schedulingDate = new Date(scheduling.date);
          return (
            schedulingDate.getUTCDate() === dateTime.getUTCDate() &&
            scheduling.start >= dateTime.getHours()
          );
        },
      ).map((scheduling) => scheduling.start);

      if (
        dayOfWeek === currentDayOfWeek &&
        dateTime.getDate() === currentDate.getDate()
      ) {
        filteredAvailableTimeForDay = availableTimeForDay.filter(
          (time: number) =>
            time > currentHour && !scheduledTimesForDay.includes(time),
        );
      } else if (dateTime > currentDate) {
        filteredAvailableTimeForDay = availableTimeForDay.filter(
          (time: number) => !scheduledTimesForDay.includes(time),
        );
      } else {
        filteredAvailableTimeForDay = [];
      }

      delete rest.Scheduling;
      delete rest.user.password;

      return {
        ...rest,
        hours: filteredAvailableTimeForDay,
      };
    });

    return filteredProfessionals;
  }

  update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
    return `This action updates a #${id} professional`;
  }

  remove(id: number) {
    return `This action removes a #${id} professional`;
  }
}
