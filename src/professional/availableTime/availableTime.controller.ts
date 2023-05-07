import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { CreateAvailableTimeDto } from '../dto/create-availableTime.dto';
import { AvailableTimeService } from './availableTime.service';

@Controller('professional/available-time')
export class AvailableTimeController {
  constructor(private readonly availableTimeService: AvailableTimeService) {}

  @Post()
  async create(@Body() createAvailableTimeDto: CreateAvailableTimeDto) {
    return await this.availableTimeService.create(createAvailableTimeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.availableTimeService.findOne(+id);
  }
}
