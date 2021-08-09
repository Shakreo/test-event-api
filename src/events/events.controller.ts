import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/events.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FilterEventsDto } from './dto/filter-events.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  getEvents(@Query() filterEventsDto: FilterEventsDto): Event[] {
    if (Object.keys(filterEventsDto).length) {
      return this.eventsService.getEvents(filterEventsDto);
    }

    return this.eventsService.getAllEvents();
  }

  @Get('/:id')
  getEventById(@Param('id') id: string): Event {
    return this.eventsService.getEventById(id);
  }

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto): Event {
    return this.eventsService.createEvent(createEventDto);
  }

  @Put('/:id')
  updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Event {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @Delete('/:id')
  deleteEvent(@Param('id') id: string): void {
    return this.eventsService.deleteEvent(id);
  }
}
