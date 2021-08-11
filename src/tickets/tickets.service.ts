import { Injectable } from '@nestjs/common';
import { FilterTicketsDto } from 'src/tickets/dto/filter-tickets.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/tickets.entity';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];

  getAllTickets(): Ticket[] {
    return this.tickets;
  }

  getFilteredTickets(filterTicketsDto: FilterTicketsDto): Ticket[] {
    const { firstName, lastName, eventId } = filterTicketsDto;
    return this.getAllTickets()
      .filter((ticket) => ticket.firstName.includes(firstName || ''))
      .filter((ticket) => ticket.lastName.includes(lastName || ''))
      .filter((ticket) => ticket.eventId.includes(eventId || ''));
  }

  getTicketByBarcode(barcode: string): Ticket {
    return this.tickets.find((ticket) => ticket.barcode === barcode);
  }

  createTicket(createTicketDto: CreateTicketDto): Ticket {
    const { barcode, firstName, lastName, eventId } = createTicketDto;
    const ticket: Ticket = {
      barcode,
      firstName,
      lastName,
      eventId,
    };
    this.tickets.push(ticket);
    return ticket;
  }

  updateTicket(barcode: string, updateTicketDto: UpdateTicketDto): Ticket {
    const index: number = this.tickets.findIndex(
      (ticket) => ticket.barcode === barcode,
    );

    this.tickets[index] = { ...this.tickets[index], ...updateTicketDto };
    return this.tickets[index];
  }

  deleteTicket(barcode: string): void {
    const index: number = this.tickets.findIndex(
      (ticket) => ticket.barcode === barcode,
    );
    this.tickets.splice(index, 1);
  }
}
