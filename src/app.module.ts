import { join } from 'path';

import * as Joi from '@hapi/joi';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ServeStaticModule,
} from '@nestjs/serve-static/dist/serve-static.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressesModule } from './addresses/addresses.module';
import { AlertModule } from './alert/alert.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { ChatModule } from './chat/chat.module';
import { CoffeesModule } from './coffees/coffees.module';
import { FilesModule } from './files/files.module';
import { LoggerMiddleware } from './logger.middleware';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ShowsModule } from './shows/shows.module';
import { SkusModule } from './skus/skus.module';
import { StripeModule } from './stripe/stripe.module';
import { UsersModule } from './users/users.module';

let dbLogging = []; // presume this logs nothing, because this var can be boolean or string or array in the docs, which seems against strict typing!
if (process.env.NODE_ENV === 'dev') {
  dbLogging = ['error'];
}

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_USER: Joi.required(),
        DATABASE_PASSWORD: Joi.required(),
        DATABASE_NAME: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: process.env.DATABASE_HOST, // database host
      port: +process.env.DATABASE_PORT, // database host
      username: process.env.DATABASE_USER, // username
      password: process.env.DATABASE_PASSWORD, // user password
      database: process.env.DATABASE_NAME, // name of our database,
      autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
      synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
      logging: dbLogging, // if in dev mode enable db logging
    }),
    AuthModule,
    CoffeesModule,
    FilesModule,
    ProductsModule,
    ShowsModule,
    UsersModule,
    StripeModule,
    CardsModule,
    SkusModule,
    OrdersModule,
    AddressesModule,
    ChatModule,
    AlertModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
