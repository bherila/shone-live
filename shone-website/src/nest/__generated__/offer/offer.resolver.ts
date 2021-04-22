/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Pl5r+UBmEuvWqAMWZhxjYUaifC2J/atp>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Offer } from './offer.entity'
import { OffersService } from './offer.service'

@Resolver(() => Offer)
export class OffersResolver {
  constructor(private readonly OffersService: OffersService) {}

  @Query(() => Offer, { nullable: true })
  offerEntId(@Args('offerEntId') offerEntId: string /* UUID */) {
    return this.OffersService.getByEntId(offerEntId)
  }

  @Query(() => [Offer])
  offers(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Offer[]> {
    return this.OffersService.findAll(paginationQuery)
  }

  // @Mutation(() => Offer)
  // async addOffer(@Args('email') email: string) {
  //   return await this.OffersService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
