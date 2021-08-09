import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class FilterEventsDto {
  @IsOptional()
  eventTitle?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  eventDateStart?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  eventDateEnd?: Date;

  @IsOptional()
  eventCity?: string;
}
