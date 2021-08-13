import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterTicketsDto } from 'src/tickets/dto/filter-tickets.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/tickets.entity';
import { randomBytes } from 'crypto';

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
    const ticket = this.tickets.find((ticket) => ticket.barcode === barcode);
    if (!ticket) {
      throw new NotFoundException();
    }
    return ticket;
  }

  createTicket(createTicketDto: CreateTicketDto): Ticket {
    const { barcode, firstName, lastName, eventId } = createTicketDto;
    const ticket: Ticket = {
      barcode:
        barcode || randomBytes(Ticket.BARCODE_LENGTH / 2).toString('hex'),
      firstName,
      lastName,
      eventId,
    };
    this.tickets.push(ticket);
    return ticket;
  }

  updateTicket(barcode: string, updateTicketDto: UpdateTicketDto): Ticket {
    const index: number = this.findIndex(barcode);
    // this.tickets[index] = { ...this.tickets[index], ...updateTicketDto };
    return (this.tickets[index] = {
      ...this.tickets[index],
      ...updateTicketDto,
    });
  }

  deleteTicket(barcode: string): void {
    const index: number = this.findIndex(barcode);
    this.tickets.splice(index, 1);
  }

  private findIndex(barcode: string): number {
    const index: number = this.tickets.findIndex(
      (ticket) => ticket.barcode === barcode,
    );
    if (index === undefined) {
      throw new NotFoundException();
    }
    return index;
  }
}
