import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
  imports: [PrismaModule]
})
export class ProfessionalModule {}
