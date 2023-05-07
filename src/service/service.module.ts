import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { PrismaModule } from 'src/prisma.module';
import { ServiceRepository } from './service.repository';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  imports: [PrismaModule]
})
export class ServiceModule {}
