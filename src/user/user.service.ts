import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Client, Prisma, Professional, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { error } from 'console';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';


@Injectable()
export class UserService {
 
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    return await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          cpf: createUserDto.cpf,
          phone: createUserDto.phone,
          birthdate: new Date(createUserDto.birthdate),
          imagePath: createUserDto.imagePath,
          password: hash,
        },
        select: {
          id: true
        }
    })
    .catch(error => {
      if(error.code === 'P2002') {
        throw new BadRequestException({
          message: 'Já existe valor para estes campos cadastrado no sistema',
          fields: error.meta.target
        });
      }

      throw new InternalServerErrorException(error);
    })
    
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

  async existsByEmail(emailQuery: string): Promise<boolean>{
    let existsUser: boolean; 
    await this.prisma.user.findFirst({
      where: {
        email: emailQuery
      }
    }).then(user => {
      existsUser = !isEmpty(user);
    });
  
    return existsUser;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        client: true,
        professional: true
      }
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

   getUserType(user: User & { client: Client; professional: Professional; }): string {
    if (!isEmpty(user.professional)) {
      return 'PROFESSIONAL';
    }
    if (!isEmpty(user.client)) {
      return 'CLIENT';
    }
    return 'ADMIN';
  }
}
