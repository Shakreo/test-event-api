import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  private events: string[];
}
