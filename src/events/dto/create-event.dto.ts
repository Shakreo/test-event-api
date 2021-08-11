import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  eventTitle: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  eventDate: Date;

  @IsNotEmpty()
  @IsString()
  eventCity: string;
}
