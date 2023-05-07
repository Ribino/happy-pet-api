import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { PrismaModule } from 'src/prisma.module';
import { ProfessionalRepository } from './professional.repository';

@Module({
  controllers: [ProfessionalController],
  providers: [ProfessionalService, ProfessionalRepository],
  imports: [PrismaModule]
})
export class ProfessionalModule {}
