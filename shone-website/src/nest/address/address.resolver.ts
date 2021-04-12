import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { Address } from './entities/address.entity'

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly AddresssService: AddressService) {}

  @Query(() => Address, { nullable: true })
  @UseGuards(new AuthGuard())
  address(@Context('user') user, @Args('addressId') addressId: number) {
    return this.AddresssService.findOne(addressId, user.id)
  }

  @Query(() => [Address])
  @UseGuards(new AuthGuard())
  addresses(@Context('user') user): Promise<Address[]> {
    return this.AddresssService.findAll(user.id)
  }

  @Mutation(() => Address)
  @UseGuards(new AuthGuard())
  async add_address(
    @Context('user') user,
    @Args('data') data: CreateAddressDto,
  ) {
    try {
      return await this.AddresssService.create(data, user)
    } catch (error) {
      console.log(`error`, error)
      throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST)
    }
  }
}
