import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const createdUser = await this.userService.create({
      email: createClientDto.email,
      name: createClientDto.name,
      password: createClientDto.password,
      cpf: createClientDto.cpf,
      birthdate: createClientDto.birthdate,
      phone: createClientDto.phone,
      imagePath: createClientDto.imagePath,
    });

    return this.prisma.client.create({
      data: {
        userId: createdUser.id,
        cep: createClientDto.cep,
        address: createClientDto.address,
        district: createClientDto.district,
      },
    });
  }

  async findAll() {
    return this.prisma.client.findMany();
  }

  async findOne(clientWhereUniqueInput: Prisma.ClientWhereUniqueInput) {
    return await this.prisma.client.findUniqueOrThrow({
      where: clientWhereUniqueInput,
    });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(removeId: number) {
    return this.prisma.client.delete({
      where: {
        id: removeId,
      },
      include: {
        user: true,
      },
    });
  }
}
