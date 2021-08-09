import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  eventTitle: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  eventDate: Date;

  @IsNotEmpty()
  eventCity: string;
}
