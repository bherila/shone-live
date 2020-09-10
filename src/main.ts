import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as expressListRoutes from 'express-list-routes'; // note package has vulnerabilities

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );
  await app.listen(3000);

  if (process.env.NODE_ENV === 'dev') {
    const server = app.getHttpServer();
    const router = server._events.request._router;
    console.log(expressListRoutes({}, 'API:', router));
  }
}
bootstrap();
