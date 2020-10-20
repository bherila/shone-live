import * as basicAuth from 'express-basic-auth';
import * as expressListRoutes from 'express-list-routes'; // note package has vulnerabilities

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'dev') {
    // just for dev
    app.enableCors();
  }
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

  // SWAGGER
  const options = new DocumentBuilder()
    .setTitle('Piki')
    .setDescription('Piki Server')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // todo: fix failed attempt to add auth to swagger api docs page
  app.use(
    '/api',
    basicAuth({
      challenge: true,
      users: { ['admin']: 'admin' },
    }),
  );
  SwaggerModule.setup('/api', app, document);

  await app.listen(3001); // set to 3001 for localhost...figure out how it works in deployment to pick up correct port on AWS
  // not 3000 b/c my client is running on 3000

  if (process.env.NODE_ENV === 'dev') {
    const server = app.getHttpServer();
    const router = server._events.request._router;
    console.log(expressListRoutes({}, 'you are in DEV mode: API:', router));
  }
}
bootstrap();
