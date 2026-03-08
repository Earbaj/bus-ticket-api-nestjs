import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { Bus, BusSchema } from '../buses/schemas/bus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Bus.name, schema: BusSchema },
    ]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
