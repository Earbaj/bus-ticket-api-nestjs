import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
export class TicketsController {

  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('book')
  bookTicket(@Req() req, @Body() dto: CreateTicketDto) {

    const userId = req.user.userId; // later JWT

    return this.ticketsService.bookTicket(userId, dto);
  }

  @Get('my/:userId')
  getUserTickets(@Param('userId') userId: string) {
    return this.ticketsService.findUserTickets(userId);
  }

  @Post('cancel/:ticketId')
  cancelTicket(@Param('ticketId') ticketId: string) {
    return this.ticketsService.cancelTicket(ticketId);
  }

}
