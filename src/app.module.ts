import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoffeesModule } from './coffees/coffees.module';
import { ProductsModule } from './products/products.module';
import { ShowsModule } from './shows/shows.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { StripeModule } from './stripe/stripe.module';
import { CardsModule } from './cards/cards.module';
import { SkusModule } from './skus/skus.module';
import { OrdersModule } from './orders/orders.module';

import * as Joi from '@hapi/joi';

let dbLogging = []; // presume this logs nothing, because this var can be boolean or string or array in the docs, which seems against strict typing!
if (process.env.NODE_ENV === 'dev') {
  dbLogging = ["error"];
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }