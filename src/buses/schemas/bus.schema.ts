import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';
import mongoose from 'mongoose';

export type BusDocument = Bus & Document;

@Schema({ timestamps: true })
export class Bus {

  @Prop({ required: true })
  busName: string;

  @Prop({
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Operator',
  required: true,
})
operatorId: string;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  departureTime: Date;

  @Prop({ required: true })
  arrivalTime: Date;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  totalSeats: number;

  @Prop({ default: [] })
  bookedSeats: number[];
}

export const BusSchema = SchemaFactory.createForClass(Bus);
