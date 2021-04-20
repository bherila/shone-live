/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ChCn239SU9BunmJhCbK4dWoU7rcU9uPi>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { AppsRepository } from './app.repository'
import { CreateAppDto } from './create-app.dto'
import { App } from './app.entity'

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App)
    private readonly AppsRepository: AppsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.AppsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<App> {
    const App = await this.AppsRepository.findOne(entId)
    if (!App) {
      throw new NotFoundException(`App entId: ${entId} not found`)
    }
    return App
  }

  async getCreatedAfter(createdAfter: Date): Promise<App[]> {
    return await this.AppsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createAppDto: CreateAppDto): Promise<App> {
    const App = this.AppsRepository.create(createAppDto)
    return this.AppsRepository.save(App, { transaction: false })
  }

  async createBulk(createAppDto: CreateAppDto[]): Promise<App[]> {
    const App = this.AppsRepository.create(createAppDto)
    return this.AppsRepository.save(App, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<App> {
    const App = await this.getByEntId(entId)
    return this.AppsRepository.softRemove(App)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
