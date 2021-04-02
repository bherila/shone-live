import 'reflect-metadata'

import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as http from 'http'
import { NextApiHandler } from 'next'

import { AppModule } from './app.module'

let app: INestApplication

export async function getApp() {
  if (!app) {
    app = await NestFactory.create(AppModule, { bodyParser: true })
    app.setGlobalPrefix('api')
    await app.init()
  }

  return app
}

export async function getListener() {
  const app = await getApp()
  const server: http.Server = app.getHttpServer()
  const [listener] = server.listeners('request') as NextApiHandler[]
  return listener
}