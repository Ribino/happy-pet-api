import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [SchedulingController],
  providers: [SchedulingService],
  imports: [PrismaModule]
})
export class SchedulingModule {}
