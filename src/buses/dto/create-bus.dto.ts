import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBusDto {

  @IsNotEmpty()
  busName: string;

  @IsNotEmpty()
  operatorId: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  departureTime: Date;

  @IsNotEmpty()
  arrivalTime: Date;

  @IsNumber()
  price: number;

  @IsNumber()
  totalSeats: number;
}
