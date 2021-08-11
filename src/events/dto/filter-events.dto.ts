import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class FilterEventsDto {
  @IsOptional()
  @IsString()
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
  @IsString()
  eventCity?: string;
}
