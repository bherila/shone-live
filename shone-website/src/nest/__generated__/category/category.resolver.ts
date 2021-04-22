/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<wY+ucDUY9PsIXpu98kim+Cd4LhJax6QP>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Category } from './category.entity'
import { CategoriesService } from './category.service'

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly CategoriesService: CategoriesService) {}

  @Query(() => Category, { nullable: true })
  categoryEntId(@Args('categoryEntId') categoryEntId: string /* UUID */) {
    return this.CategoriesService.getByEntId(categoryEntId)
  }

  @Query(() => [Category])
  categories(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Category[]> {
    return this.CategoriesService.findAll(paginationQuery)
  }

  // @Mutation(() => Category)
  // async addCategory(@Args('email') email: string) {
  //   return await this.CategoriesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
