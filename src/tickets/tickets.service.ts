import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './schemas/ticket.schema';
import { Bus } from '../buses/schemas/bus.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {

  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    @InjectModel(Bus.name) private busModel: Model<Bus>,
  ) {}

  async bookTicket(userId: string, dto: CreateTicketDto) {

    const bus = await this.busModel.findById(dto.busId);

    if (!bus) throw new BadRequestException('Bus not found');

    const alreadyBooked = dto.seatNumbers.some(seat =>
      bus.bookedSeats.includes(seat),
    );

    if (alreadyBooked) {
      throw new BadRequestException('Seat already booked');
    }

    bus.bookedSeats.push(...dto.seatNumbers);
    await bus.save();

    const ticket = await this.ticketModel.create({
      ...dto,
      userId,
      status: 'confirmed',
    });

    return ticket;
  }

  findUserTickets(userId: string) {
    return this.ticketModel
      .find({ userId })
      .populate('busId');
  }

  async cancelTicket(ticketId: string) {

    const ticket = await this.ticketModel.findById(ticketId);

    if (!ticket) throw new BadRequestException('Ticket not found');

    ticket.status = 'cancelled';

    return ticket.save();
  }

}
