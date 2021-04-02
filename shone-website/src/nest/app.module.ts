import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HelloModule } from './hello/hello.module'
import { SentryModule } from '@ntegral/nestjs-sentry'
import { LogLevel } from '@sentry/types'

@Module({
  imports: [
    HelloModule,
    SentryModule.forRoot({
      dsn:
        'https://d8d0885570264456a4f9807c73d95be0@o563477.ingest.sentry.io/5703507',
      debug: true, // true | false,
      environment: process.env.NODE_ENV,
      release: null, // if not null, must create release in sentry.io dashboard
      logLevel: LogLevel.Debug, //based on sentry.io loglevel //
    }),
    GraphQLModule.forRoot({
      path: '/api/graphql',
      installSubscriptionHandlers: false,
      autoSchemaFile: process.env.VERCEL ? '/tmp/schema.gql' : join('public/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
