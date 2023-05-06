import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaModule } from 'src/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [PrismaModule, UserModule]
})
export class ClientModule {}
