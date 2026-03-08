import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OperatorDocument = Operator & Document;

@Schema({ timestamps: true })
export class Operator {

  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
