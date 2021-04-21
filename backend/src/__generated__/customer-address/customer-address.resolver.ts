/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Z6HghZwohL2vlpHDxvjaSJar4cp+0mN+>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CustomerAddressesService } from './customer-address.service'
import { CustomerAddress } from './customer-address.entity'

@Resolver(() => CustomerAddress)
export class CustomerAddressesResolver {
  constructor(
    private readonly CustomerAddressesService: CustomerAddressesService,
  ) {}

  @Query(() => CustomerAddress, { nullable: true })
  customerAddressEntId(
    @Args('customerAddressEntId') customerAddressEntId: string /* UUID */,
  ) {
    return this.CustomerAddressesService.getByEntId(customerAddressEntId)
  }

  @Query(() => [CustomerAddress])
  customerAddresses(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<CustomerAddress[]> {
    return this.CustomerAddressesService.findAll(paginationQuery)
  }

  // @Mutation(() => CustomerAddress)
  // async addCustomerAddress(@Args('email') email: string) {
  //   return await this.CustomerAddressesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
