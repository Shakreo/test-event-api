import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class Ticket {
  static BARCODE_LENGTH = 8;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsAlphanumeric()
  @Length(1, 8)
  barcode: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
