import * as request from 'supertest';
import { getConnection } from 'typeorm';

// prettier-ignore
import {
  HttpServer, HttpStatus, INestApplication, ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeesModule } from '../src/coffees/coffees.module';
import { CreateCoffeeDto } from '../src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../src/coffees/dto/update-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Dark Roast',
    brand: 'sightglass',
    flavors: ['chocolate', 'vanilla'],
  };

  const expectedPartialCoffee = jasmine.objectContaining({
    ...coffee,
    flavors: jasmine.arrayContaining(
      coffee.flavors.map(name => jasmine.objectContaining({ name })),
    ),
  });

  let app: INestApplication;
  let httpServer: HttpServer;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          // see note in auth e2e test about local/vs docker
          host: process.env.POSTGRES_LOCAL_HOST,
          port: +process.env.TEST_POSTGRES_PORT,
          username: process.env.TEST_POSTGRES_USER,
          password: process.env.TEST_POSTGRES_PASSWORD,
          database: process.env.TEST_POSTGRES_DB,
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await getConnection().synchronize(true);
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create [POST /]', () => {
    return request(httpServer)
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });

  it('Get all [GET /]', () => {
    return request(httpServer)
      .get('/coffees')
      .then(({ body }) => {
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toEqual(expectedPartialCoffee);
      });
  });

  it('Get one [GET /:id]', () => {
    return request(httpServer)
      .get('/coffees/1')
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });

  it('Update one [PATCH /:id]', () => {
    const updateCoffeeDto: UpdateCoffeeDto = {
      ...coffee,
      name: 'New and Improved Shipwreck Roast',
    };
    return request(httpServer)
      .patch('/coffees/1')
      .send(updateCoffeeDto)
      .then(({ body }) => {
        expect(body.name).toEqual(updateCoffeeDto.name);

        return request(httpServer)
          .get('/coffees/1')
          .then(({ body }) => {
            expect(body.name).toEqual(updateCoffeeDto.name);
          });
      });
  });

  it('Delete one [DELETE /:id]', () => {
    return request(httpServer)
      .delete('/coffees/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(httpServer)
          .get('/coffees/1')
          .expect(HttpStatus.NOT_FOUND);
      });
  });
});
