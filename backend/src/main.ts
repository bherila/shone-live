import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { json } from 'body-parser'
import cloneBuffer from 'clone-buffer'
import dotenv from 'dotenv'
import expressListRoutes from 'express-list-routes'

import { AppModule } from './app.module'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  if (process.env.NODE_ENV === 'dev') {
    // just for dev
    console.log(`the environment mode is ${process.env.NODE_ENV} mode`)

    app.enableCors()
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
  )

  // https://yanndanthu.github.io/2019/07/04/Checking-Stripe-Webhook-Signatures-from-NestJS.html
  app.use(
    json({
      verify: (req: any, res, buf) => {
        // important to store rawBody for Stripe signature verification
        if (req.headers['stripe-signature'] && Buffer.isBuffer(buf)) {
          req.rawBody = cloneBuffer(buf)
        }
        return true
      },
    }),
  )

  await app.listen(process.env.SERVER_PORT || 4000)

  if (process.env.NODE_ENV === 'dev') {
    const server = app.getHttpServer()
    const router = server._events.request._router
    console.log(expressListRoutes({}, 'you are in DEV mode: API:', router))
  }
}
bootstrap()
