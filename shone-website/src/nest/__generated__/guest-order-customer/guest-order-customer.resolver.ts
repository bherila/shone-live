/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<YS1GF7z/kVAutbXhZGzWr+fnd++feB4C>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { GuestOrderCustomersService } from './guest-order-customer.service'
import { GuestOrderCustomer } from './guest-order-customer.entity'

@Resolver(() => GuestOrderCustomer)
export class GuestOrderCustomersResolver {
  constructor(
    private readonly GuestOrderCustomersService: GuestOrderCustomersService,
  ) {}

  @Query(() => GuestOrderCustomer, { nullable: true })
  guestOrderCustomerEntId(
    @Args('guestOrderCustomerEntId') guestOrderCustomerEntId: string /* UUID */,
  ) {
    return this.GuestOrderCustomersService.getByEntId(guestOrderCustomerEntId)
  }

  @Query(() => [GuestOrderCustomer])
  guestOrderCustomers(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<GuestOrderCustomer[]> {
    return this.GuestOrderCustomersService.findAll(paginationQuery)
  }

  // @Mutation(() => GuestOrderCustomer)
  // async addGuestOrderCustomer(@Args('email') email: string) {
  //   return await this.GuestOrderCustomersService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
