import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { ProfessionalModule } from './professional/professional.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { ServiceModule } from './service/service.module';
import { PetModule } from './pet/pet.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [UserModule, ClientModule, ProfessionalModule, SchedulingModule, ServiceModule, PetModule],
  providers: [PrismaClient]
})
export class AppModule {}
