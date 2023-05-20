import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post()
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalService.create(createProfessionalDto);
  }

  @Get()
  async findAll() {
    return await this.professionalService.findAll();
  }

  @Get('available')
  async findByDateAndService(
    @Query('serviceId') serviceId: string,
    @Query('date') date: string,
  ) {
    return await this.professionalService.findByDateAndService(
      +serviceId,
      date,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.professionalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
  ) {
    return this.professionalService.update(+id, updateProfessionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalService.remove(+id);
  }
}
