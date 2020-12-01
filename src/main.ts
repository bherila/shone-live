import { config } from 'aws-sdk';
import * as basicAuth from 'express-basic-auth';
import * as expressListRoutes from 'express-list-routes'; // note package has vulnerabilities

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

import { AppModule } from './app.module';

const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'dev') {
    // just for dev
    console.log(`the environment mode is ${process.env.NODE_ENV} mode`);

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

  fs.writeFileSync('./open-api.json', JSON.stringify(document));

  // todo: this works, but we should move the PW to the env at least so it's not in the repo
  app.use(
    '/api',
    basicAuth({
      challenge: true,
      users: { ['admin']: 'admin' },
    }),
  );
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  await app.listen(process.env.SERVER_PORT); // set to 3001 for localhost...figure out how it works in deployment to pick up correct port on AWS
  // not 3000 b/c my client is running on 3000

  if (process.env.NODE_ENV === 'dev') {
    const server = app.getHttpServer();
    const router = server._events.request._router;
    console.log(expressListRoutes({}, 'you are in DEV mode: API:', router));
  }
}
bootstrap();
