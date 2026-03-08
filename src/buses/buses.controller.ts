import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';

@Controller('buses')
export class BusesController {

  constructor(private readonly busesService: BusesService) {}

  @Post()
  create(@Body() createBusDto: CreateBusDto) {
    return this.busesService.create(createBusDto);
  }

  @Get()
  findAll() {
    return this.busesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busesService.findOne(id);
  }

}
