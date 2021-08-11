import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @Length(1, 8)
  barcode: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
