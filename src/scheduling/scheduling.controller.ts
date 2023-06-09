import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';

@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post()
  async create(@Body() createSchedulingDto: CreateSchedulingDto) {
    return await this.schedulingService.create(createSchedulingDto);
  }

  @Get()
  findAll() {
    return this.schedulingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulingService.findOne(+id);
  }

  @Get('client/:clientId')
  findAllByClientId(@Param('clientId') clientId: string) {
    return this.schedulingService.findAllByClientId(+clientId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchedulingDto: UpdateSchedulingDto,
  ) {
    return this.schedulingService.update(+id, updateSchedulingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulingService.remove(+id);
  }
}
