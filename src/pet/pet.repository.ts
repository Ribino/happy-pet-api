import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Client } from '@prisma/client';

@Injectable()
export class PetRepository {
  constructor(private prisma: PrismaService) {}

  async create(createPetInput: Prisma.PetCreateInput) {
    return await this.prisma.pet.create({
      data: createPetInput,
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.pet.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.pet.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByClientId(clientId: number) {
    return await this.prisma.pet.findMany({
      where: {
        Client: {
          userId: clientId,
        },
      },
    });
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
