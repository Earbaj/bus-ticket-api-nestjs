import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTicketDto {

  @IsNotEmpty()
  busId: string;

  @IsNotEmpty()
  passengerName: string;

  @IsNotEmpty()
  passengerPhone: string;

  @IsArray()
  seatNumbers: number[];

  @IsNumber()
  totalPrice: number;
}
