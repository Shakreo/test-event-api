import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  eventTitle?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  eventDate?: Date;

  @IsOptional()
  eventCity?: string;
}
