import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import * as http from 'http'
import { NextApiHandler } from 'next'

import { GlobalInterface } from '../types/general'
import { AppModule } from './app.module'

declare let global: GlobalInterface

export async function getApp() {
  if (!global.app) {
    global.app = await NestFactory.create(AppModule, { bodyParser: true })
    global.app.setGlobalPrefix('api')
    await global.app.init()
  }

  return global.app
}

export async function getListener() {
  const app = await getApp()
  const server: http.Server = app.getHttpServer()
  const [listener] = server.listeners('request') as NextApiHandler[]
  return listener
}
