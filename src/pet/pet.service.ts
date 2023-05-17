import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Prisma, Client } from '@prisma/client';
import { PetRepository } from './pet.repository';

@Injectable()
export class PetService {
  constructor(private petRepository: PetRepository) {}

  async create(createPetDto: CreatePetDto) {
    try {
      const createPetInput: Prisma.PetCreateInput = {
        name: createPetDto.name,
        color: createPetDto.color,
        fur: createPetDto.fur,
        neutered: createPetDto.neutered,
        race: createPetDto.race,
        sex: createPetDto.sex,
        temperament: createPetDto.temperament,
        type: createPetDto.type,
        birthdate: new Date(createPetDto.birthdate),
        weight: createPetDto.weight,
        imagePath: createPetDto.imagePath,
        Client: {
          connect: {
            id: createPetDto.clientId,
          },
        },
      };

      return await this.petRepository.create(createPetInput);
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
    return await this.petRepository.findAll();
  }

  async findOne(id: number) {
    return await this.petRepository.findOne(id);
  }

  async findByClientId(clientId: number) {
    return await this.petRepository.findByClientId(clientId);
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
