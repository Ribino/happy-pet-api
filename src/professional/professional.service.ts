import { Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfessionalService {
  
  constructor(private prisma: PrismaService) {}

  create(createProfessionalDto: CreateProfessionalDto) {
    return 'This action adds a new professional';
  }

  findAll() {
    return `This action returns all professional`;
  }

  findOne(id: number) {
    return `This action returns a #${id} professional`;
  }

  update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
    return `This action updates a #${id} professional`;
  }

  remove(id: number) {
    return `This action removes a #${id} professional`;
  }
}
