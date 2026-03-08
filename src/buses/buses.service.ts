import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bus } from './schemas/bus.schema';
import { Model } from 'mongoose';
import { CreateBusDto } from './dto/create-bus.dto';

@Injectable()
export class BusesService {

  constructor(
    @InjectModel(Bus.name)
    private busModel: Model<Bus>,
  ) {}

  create(createBusDto: CreateBusDto) {
    return this.busModel.create(createBusDto);
  }

  findAll() {

  return this.busModel
    .find()
    .populate('operatorId');

}

findOne(id: string) {

  return this.busModel
    .findById(id)
    .populate('operatorId');

}

}
