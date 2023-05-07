import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Client, Prisma, Professional, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hash;
      const userCreateInput: Prisma.UserCreateInput = {
        name: createUserDto.name,
        email: createUserDto.email,
        cpf: createUserDto.cpf,
        phone: createUserDto.phone,
        birthdate: new Date(createUserDto.birthdate),
        imagePath: createUserDto.imagePath,
        password: createUserDto.password,
      };
      return await this.userRepository.create(userCreateInput);
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
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async existsUser(where: Prisma.UserWhereUniqueInput): Promise<boolean> {
    return await this.userRepository.existsUser(where);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    await this.userRepository.remove(id);
  }

  getUserType(
    user: User & { client: Client; professional: Professional },
  ): string {
    if (!isEmpty(user.professional)) {
      return 'PROFESSIONAL';
    }
    if (!isEmpty(user.client)) {
      return 'CLIENT';
    }
    return 'ADMIN';
  }
}
