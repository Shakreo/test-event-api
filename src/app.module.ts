import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [EventsModule, TicketsModule],
})
export class AppModule {}
