import { Body, Controller, Get, Post } from '@nestjs/common';
import { OperatorsService } from './operators.service';

@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Post()
  create(@Body() body: any) {
    return this.operatorsService.create(body);
  }

  @Get()
  findAll() {
    return this.operatorsService.findAll();
  }
}
