import * as expressListRoutes from 'express-list-routes'; // note package has vulnerabilities

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

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
  await app.listen(3001); // set to 3001 for localhost...figure out how it works in deployment to pick up correct port on AWS
  // not 3000 b/c my client is running on 3000

  if (process.env.NODE_ENV === 'dev') {
    const server = app.getHttpServer();
    const router = server._events.request._router;
    console.log(expressListRoutes({}, 'you are in DEV mode: API:', router));
  }
}
bootstrap();
