import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
// import { randomUUID } from 'node:crypto';
import { CreateEventDto } from './dto/create-event.dto';
import { FilterEventsDto } from './dto/filter-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/events.entity';
// import { v8 as uuid } from 'uuid';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  getAllEvents(): Event[] {
    return this.events;
  }

  getEvents(filterEventsDto: FilterEventsDto): Event[] {
    const { eventTitle, eventDateStart, eventDateEnd, eventCity } =
      filterEventsDto;
    return this.getAllEvents()
      .filter((result) => result.eventTitle.includes(eventTitle || ''))
      .filter((result) => result.eventCity.includes(eventCity || ''))
      .filter((result) => result.eventDate >= eventDateStart)
      .filter((result) => result.eventDate <= eventDateEnd);
  }

  getEventById(id: string): Event {
    return this.events.find((event) => event.id === id);
  }

  createEvent(createEventDto: CreateEventDto): Event {
    const { eventTitle, eventDate, eventCity } = createEventDto;

    const event: Event = {
      id: randomUUID(),
      eventTitle,
      eventDate,
      eventCity,
    };

    this.events.push(event);
    return event;
  }

  updateEvent(id: string, updateEventDto: UpdateEventDto): Event {
    const index: number = this.events.findIndex((event) => event.id === id);

    this.events[index] = { ...this.events[index], ...updateEventDto };
    return this.events[index];
  }

  deleteEvent(id: string): void {
    const index: number = this.events.findIndex((event) => event.id === id);
    this.events.splice(index, 1);
  }
}
