import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Operator } from './schemas/operator.schema';
import { Model } from 'mongoose';

@Injectable()
export class OperatorsService {
  constructor(
    @InjectModel(Operator.name)
    private operatorModel: Model<Operator>,
  ) {}

  create(data: any) {
    return this.operatorModel.create(data);
  }

  findAll() {
    return this.operatorModel.find();
  }
}
