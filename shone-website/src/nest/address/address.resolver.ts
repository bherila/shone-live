import { HttpException, HttpStatus } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { Address } from './entities/address.entity'

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly AddresssService: AddressService) {}

  @Query(() => Address, { nullable: true })
  address(@Args('addressId') addressId: number) {
    return this.AddresssService.findOne(addressId)
  }

  @Query(() => [Address])
  addresses(): Promise<Address[]> {
    return this.AddresssService.findAll()
  }

  @Mutation(() => Address)
  async addAddress(@Args('data') data: CreateAddressDto) {
    try {
      return await this.AddresssService.create(data)
    } catch (error) {
      console.log(`error`, error)
      throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST)
    }
  }
}
