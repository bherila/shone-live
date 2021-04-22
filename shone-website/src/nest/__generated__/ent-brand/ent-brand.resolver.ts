/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<63gdqNLEpD2CBpHGXM1A6roi7gY1NVjm>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { EntBrand } from './ent-brand.entity'
import { EntBrandsService } from './ent-brand.service'

@Resolver(() => EntBrand)
export class EntBrandsResolver {
  constructor(private readonly EntBrandsService: EntBrandsService) {}

  @Query(() => EntBrand, { nullable: true })
  entBrandEntId(@Args('entBrandEntId') entBrandEntId: string /* UUID */) {
    return this.EntBrandsService.getByEntId(entBrandEntId)
  }

  @Query(() => [EntBrand])
  entBrands(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<EntBrand[]> {
    return this.EntBrandsService.findAll(paginationQuery)
  }

  // @Mutation(() => EntBrand)
  // async addEntBrand(@Args('email') email: string) {
  //   return await this.EntBrandsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
