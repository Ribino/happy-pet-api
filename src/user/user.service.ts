import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        cpf: createUserDto.cpf,
        phone: createUserDto.phone,
        birthdate: new Date(createUserDto.birthdate),
        imagePath: createUserDto.imagePath,
        password: hash,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  findByEmail(email: string) {
    console.log(email);
    return this.prisma.user.findUnique({
      where: {
        email
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const updateUserInput: Prisma.UserUpdateInput = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      birthdate: '',
      imagePath: '',
    };

    return this.prisma.user.update({
      data: updateUserInput,
      where: {
        id: 0,
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
