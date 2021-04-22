/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<haxc5gnqYHM1vUcNYAFTi1OnBDnTUfnR>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Meta } from './meta.entity'
import { MetasService } from './meta.service'

@Resolver(() => Meta)
export class MetasResolver {
  constructor(private readonly MetasService: MetasService) {}

  @Query(() => Meta, { nullable: true })
  metaEntId(@Args('metaEntId') metaEntId: string /* UUID */) {
    return this.MetasService.getByEntId(metaEntId)
  }

  @Query(() => [Meta])
  metas(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Meta[]> {
    return this.MetasService.findAll(paginationQuery)
  }

  // @Mutation(() => Meta)
  // async addMeta(@Args('email') email: string) {
  //   return await this.MetasService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
