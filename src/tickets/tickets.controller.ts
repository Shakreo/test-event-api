import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { FilterTicketsDto } from './dto/filter-tickets.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/tickets.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  getTickets(@Query() filterTicketsDto: FilterTicketsDto): Ticket[] {
    if (Object.keys(filterTicketsDto).length) {
      return this.ticketsService.getFilteredTickets(filterTicketsDto);
    }
    return this.ticketsService.getAllTickets();
  }

  @Get('/:barcode')
  getTicket(@Param('barcode') barcode: string): Ticket {
    return this.ticketsService.getTicketByBarcode(barcode);
  }

  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto): Ticket {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Put('/:barcode')
  updateTicket(
    @Param('barcode') barcode: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Ticket {
    return this.ticketsService.updateTicket(barcode, updateTicketDto);
  }

  @Delete('/:barcode')
  deleteTicket(@Param('barcode') barcode: string): void {
    this.ticketsService.getTicketByBarcode(barcode);
    return;
  }
}
