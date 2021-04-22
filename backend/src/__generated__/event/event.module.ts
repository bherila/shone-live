/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<RZn4QHrVjfBX2anC1m6aTXAEC/KW3d72>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EventsRepository } from './event.repository'
import { EventsResolver } from './event.resolver'
import { EventsService } from './event.service'
import { Event } from './event.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventsRepository])],
  providers: [EventsService, EventsResolver],
})
export class EventsModule {}
