import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const createUserInput: Prisma.UserCreateInput = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      birthdate: '',
      imagePath: '',
    }
    
    return this.prisma.user.create({
      data: createUserInput
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const updateUserInput: Prisma.UserUpdateInput = {
      id: 0,
      name: '',
      email: '',
      cpf: '',
      phone: '',
      birthdate: '',
      imagePath: '',
    }
    
    return this.prisma.user.update({
      data: updateUserInput,
      where: {
        id: 0
      }
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id
      }
    });
  }
}
