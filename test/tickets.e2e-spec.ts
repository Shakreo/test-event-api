import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TicketsService } from '../src/tickets/tickets.service';
import { TicketsModule } from '../src/tickets/tickets.module';

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let ticketsService: TicketsService;

  const ticketParams = {
    barcode: 'lvleq311',
    firstName: 'Satou',
    lastName: 'Pendragon',
    eventId: 'a53adafb-55c8-46c1-a86d-e18015baeba8',
  };

  const ticketParams2 = {
    barcode: 'spichron1',
    firstName: 'Haruto',
    lastName: 'Amakawa',
    eventId: 'a53adafb-44c8-46c1-a86d-e18015baeba8',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TicketsModule],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    ticketsService = module.get(TicketsService);

    ticketsService.createTicket(ticketParams);
    ticketsService.createTicket(ticketParams2);
  });

  it('/tickets (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/tickets');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('/tickets (GET) filtered by firstName', async () => {
    const response = await request(app.getHttpServer()).get(
      '/tickets?firstName=Haru',
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('/tickets (GET) filter by lastName', async () => {
    const response = await request(app.getHttpServer()).get(
      '/tickets?lastName=kawa',
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('/tickets (GET) filter by eventId', async () => {
    const response = await request(app.getHttpServer()).get(
      '/tickets?eventId=44c8',
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('/tickets/:barcode (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/tickets/${ticketParams.barcode}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(ticketParams);
  });

  it('/tickets/:barcode (GET) unknown id', async () => {
    const response = await request(app.getHttpServer()).get('/tickets/unknown');
    expect(response.status).toBe(404);
  });

  it('/tickets (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/tickets')
      .send(ticketParams);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(ticketParams);
  });

  it('/tickets (POST) invalid barcode', async () => {
    const response = await request(app.getHttpServer())
      .post('/tickets')
      .send({ ...ticketParams, barcode: 'asdfm1234' });
    expect(response.status).toBe(400);
  });

  it('/tickets/:barcode (PUT)', async () => {
    const updateParams = {
      firstName: 'Tatsuya',
      lastName: 'Shiba',
    };
    const response = await request(app.getHttpServer())
      .put(`/tickets/${ticketParams.barcode}`)
      .send(updateParams);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updateParams);
  });

  it('/tickets/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/tickets/' + ticketParams.barcode,
    );
    expect(response.status).toBe(200);
  });
});
