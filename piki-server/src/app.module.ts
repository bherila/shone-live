import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SentryModule } from "@ntegral/nestjs-sentry";
import { LogLevel } from "@sentry/types";
import { join } from "path";

import { AddressesModule } from "./addresses/addresses.module";
import { AgoraModule } from "./agora/agora.module";
import { AlertModule } from "./alert/alert.module";
import { AuthModule } from "./auth/auth.module";
import { CardsModule } from "./cards/cards.module";
import { ChatModule } from "./chat/chat.module";
import { CommonModule } from "./common/common.module";
import { AspectLogger } from "./common/interceptors/aspect-logger.interceptor";
import { FilesModule } from "./files/files.module";
import { OrdersModule } from "./orders/orders.module";
import { ProductsModule } from "./products/products.module";
import { ShowsModule } from "./shows/shows.module";
import { SimpleProductsModule } from "./simple-products/simple-products.module";
import { SkusModule } from "./skus/skus.module";
import { StripeModule } from "./stripe/stripe.module";
import { Stripe2Module } from "./stripe2/stripe2.module";
import { UsersModule } from "./users/users.module";

let dbLogging = []; // presume this logs nothing, because this var can be boolean or string or array in the docs, which seems against strict typing!
if (process.env.NODE_ENV === "dev") {
  dbLogging = ["error"];
}

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_DOCKER_HOST: Joi.required(),
        POSTGRES_USER: Joi.required(),
        POSTGRES_PASSWORD: Joi.required(),
        POSTGRES_DB: Joi.required(),
        POSTGRES_PORT: Joi.number().default(5432),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        AWS_PRIVATE_BUCKET_NAME: Joi.string().required()
      })
    }),
    SentryModule.forRoot({
      dsn:
        "https://6d671267ceaa4230b187967c3071c2f7@o459464.ingest.sentry.io/5480197",
      debug: true, // true | false,
      environment: process.env.NODE_ENV,
      release: null, // if not null, must create release in sentry.io dashboard
      logLevel: LogLevel.Debug //based on sentry.io loglevel //
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static")
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_DOCKER_HOST,
      // host: process.env.POSTGRES_LOCAL_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true, // disable in the production
      // TODO: export migration for prod DB
      logging: dbLogging // if in dev mode enable db logging
    }),
    AuthModule,
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
    FilesModule,
    CommonModule,
    SimpleProductsModule,
    Stripe2Module,
    AgoraModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AspectLogger
    }
  ]
})
export class AppModule {}
