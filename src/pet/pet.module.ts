import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PrismaModule } from 'src/prisma.module';
import { PetRepository } from './pet.repository';

@Module({
  controllers: [PetController],
  providers: [PetService, PetRepository],
  imports: [PrismaModule]
})
export class PetModule {}
