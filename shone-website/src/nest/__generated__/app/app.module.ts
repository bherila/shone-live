/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<310CnAIqaIcWNj3CZpJkzA09V+FPWR0d>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { App } from './app.entity'
import { AppsRepository } from './app.repository'
import { AppsResolver } from './app.resolver'
import { AppsService } from './app.service'

@Module({
  imports: [TypeOrmModule.forFeature([App, AppsRepository])],
  providers: [AppsService, AppsResolver],
})
export class AppsModule {}
