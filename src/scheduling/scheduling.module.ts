import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { PrismaModule } from 'src/prisma.module';
import { SchedulingRepository } from './scheduling.repository';

@Module({
  controllers: [SchedulingController],
  providers: [SchedulingService, SchedulingRepository],
  imports: [PrismaModule]
})
export class SchedulingModule {}
