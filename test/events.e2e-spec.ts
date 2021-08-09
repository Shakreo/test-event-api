import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { EventsService } from '../src/events/events.service';
import { EventsModule } from '../src/events/events.module';

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let eventsService: EventsService;

  const eventParams = {
    eventTitle: 'Christmas2021',
    eventDate: new Date(2021, 12, 24),
    eventCity: 'worldwide',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventsModule],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    eventsService = module.get(EventsService);

    eventsService.createEvent(eventParams);
  });

  it('/events (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/events');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('/events (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/events')
      .send(eventParams);
    expect(response.status).toBe(201);
    expect(response.body.eventTitle).toMatch(eventParams.eventTitle);
    expect(response.body.eventDate).toMatch(
      eventParams.eventDate.toISOString(),
    );
    expect(response.body.eventCity).toMatch(eventParams.eventCity);
  });

  it('/events (POST) catch invalid date', async () => {
    const response = await request(app.getHttpServer())
      .post('/events')
      .send({ ...eventParams, eventDate: 'invalid' });
    expect(response.status).toBe(400);
    expect(response.body.message).toMatchObject([
      'eventDate must be a Date instance',
    ]);
  });

  it('/events (GET) filtered by title', async () => {
    const response = await request(app.getHttpServer()).get(
      '/events?eventTitle=2022',
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it('/events (GET) filtered by city', async () => {
    const response = await request(app.getHttpServer()).get(
      '/events?eventCity=Cologne',
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it('/events (GET) filtered by date start', async () => {
    const response = await request(app.getHttpServer()).get(
      '/events?eventDateStart=2021-12-25%2000:00:00:000',
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it('/events (GET) filtered by date end', async () => {
    const response = await request(app.getHttpServer()).get(
      '/events?eventDateEnd=2021-12-23%2000:00:00:000',
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it('/events/:id (GET)', async () => {
    const id = eventsService.getAllEvents()[0].id;
    const response = await request(app.getHttpServer()).get('/events/' + id);
    expect(response.status).toBe(200);
    expect(response.body.eventTitle).toMatch(eventParams.eventTitle);
    expect(response.body.eventDate).toMatch(
      eventParams.eventDate.toISOString(),
    );
    expect(response.body.eventCity).toMatch(eventParams.eventCity);
  });

  it('/events/:id (PUT)', async () => {
    const updateParams = {
      eventTitle: 'Christmas2022',
      eventDate: new Date('2022-12-24 00:00:00:000'),
      eventCity: 'cologne',
    };

    const id = eventsService.getAllEvents()[0].id;
    const response = await request(app.getHttpServer())
      .put('/events/' + id)
      .send(updateParams);
    expect(response.status).toBe(200);
    expect(response.body.eventTitle).toMatch(updateParams.eventTitle);
    expect(response.body.eventDate).toMatch(
      updateParams.eventDate.toISOString(),
    );
    expect(response.body.eventCity).toMatch(updateParams.eventCity);
  });

  it('/events/:id (DELETE)', async () => {
    const id = eventsService.getAllEvents()[0].id;
    const response = await request(app.getHttpServer()).delete('/events/' + id);
    expect(response.status).toBe(200);
  });
});
