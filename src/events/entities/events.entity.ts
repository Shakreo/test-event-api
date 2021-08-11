import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Event {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  eventTitle: string;

  @IsDate()
  @IsNotEmpty()
  eventDate: Date;

  @IsString()
  @IsNotEmpty()
  eventCity: string;
}
