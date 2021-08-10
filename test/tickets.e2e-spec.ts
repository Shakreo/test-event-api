import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TicketsService } from 'src/tickets/tickets.service';
import { TicketsModule } from 'src/tickets/tickets.module';

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let ticketsService: TicketsService;

  const ticketParams = {
    barcode: 'aBcD1234',
    firstName: 'Satou',
    lastName: 'Pendragon',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TicketsModule],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    ticketsService = module.get(TicketsService);

    ticketsService.createEvent(ticketParams);
  });

  it('/tickets (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/events');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});
