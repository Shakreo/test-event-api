import { IsOptional, IsString } from 'class-validator';

export class FilterTicketsDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  eventId?: string;
}
