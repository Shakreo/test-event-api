import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  eventTitle?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  eventDate?: Date;

  @IsOptional()
  @IsString()
  eventCity?: string;
}
