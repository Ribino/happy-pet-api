import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { isEmpty } from 'lodash';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: createUserInput,
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async existsUser(where: Prisma.UserWhereUniqueInput): Promise<boolean> {
    let existsUser: boolean;
    await this.prisma.user
      .findFirst({
        where,
      })
      .then((user) => {
        existsUser = !isEmpty(user);
      });
    return existsUser;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        client: true,
        professional: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.birthdate = new Date(updateUserDto.birthdate);
    await this.prisma.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
