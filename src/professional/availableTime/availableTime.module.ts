import { Module } from "@nestjs/common";
import { AvailableTimeService } from "./availableTime.service";
import { AvailableTimeRepository } from "./availableTime.repository";
import { AvailableTimeController } from "./availableTime.controller";
import { PrismaModule } from "src/prisma.module";


@Module({
  controllers: [AvailableTimeController],
  providers: [AvailableTimeService, AvailableTimeRepository],
  imports: [PrismaModule]
})
export class AvailableTimeModule {}
