/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<9QKQkOlRZ3cAkH2IFBd2+s0jiE2DM8aG>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Category } from './category.entity'
import { CategoriesRepository } from './category.repository'
import { CreateCategoryDto } from './create-category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoriesRepository: CategoriesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.CategoriesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Category> {
    const Category = await this.CategoriesRepository.findOne(entId)
    if (!Category) {
      throw new NotFoundException(`Category entId: ${entId} not found`)
    }
    return Category
  }

  async getCreatedAfter(createdAfter: Date): Promise<Category[]> {
    return await this.CategoriesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const Category = this.CategoriesRepository.create(createCategoryDto)
    return this.CategoriesRepository.save(Category, { transaction: false })
  }

  async createBulk(
    createCategoryDto: CreateCategoryDto[],
  ): Promise<Category[]> {
    const Category = this.CategoriesRepository.create(createCategoryDto)
    return this.CategoriesRepository.save(Category, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Category> {
    const Category = await this.getByEntId(entId)
    return this.CategoriesRepository.softRemove(Category)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
