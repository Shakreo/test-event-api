import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { Ticket } from '../entities/tickets.entity';

export class CreateTicketDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsAlphanumeric()
  @Length(1, Ticket.BARCODE_LENGTH)
  @IsOptional()
  barcode: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
