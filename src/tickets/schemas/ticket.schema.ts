import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Bus', required: true })
  busId: Types.ObjectId;

  @Prop({ required: true })
  passengerName: string;

  @Prop({ required: true })
  passengerPhone: string;

  @Prop({ required: true })
  seatNumbers: number[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  })
  status: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
