/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<gtqnok9LiR3Vmsh4qmW+zkt2vAYoA3QJ>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { EventsRepository } from './event.repository'
import { CreateEventDto } from './create-event.dto'
import { Event } from './event.entity'

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly EventsRepository: EventsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.EventsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Event> {
    const Event = await this.EventsRepository.findOne(entId)
    if (!Event) {
      throw new NotFoundException(`Event entId: ${entId} not found`)
    }
    return Event
  }

  async getCreatedAfter(createdAfter: Date): Promise<Event[]> {
    return await this.EventsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const Event = this.EventsRepository.create(createEventDto)
    return this.EventsRepository.save(Event, { transaction: false })
  }

  async createBulk(createEventDto: CreateEventDto[]): Promise<Event[]> {
    const Event = this.EventsRepository.create(createEventDto)
    return this.EventsRepository.save(Event, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Event> {
    const Event = await this.getByEntId(entId)
    return this.EventsRepository.softRemove(Event)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
