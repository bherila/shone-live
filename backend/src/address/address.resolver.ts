import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { CreateDefaultAddressDto } from './dto/create-default-address-dto'
import { DeleteAddessOutputDto } from './dto/delete-address-output.dto'
import { Address } from './entities/address.entity'

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly AddresssService: AddressService) {}

  @Query(() => Address, { nullable: true })
  @UseGuards(new AuthGuard())
  address(@Context('user') user, @Args('addressId') addressId: string) {
    return this.AddresssService.findOne(addressId, user.id)
  }

  @Query(() => [Address])
  @UseGuards(new AuthGuard())
  addresses(@Context('user') user): Promise<Address[]> {
    return this.AddresssService.findAll(user.id)
  }

  @Mutation(() => Address)
  @UseGuards(new AuthGuard())
  async addAddress(
    @Context('user') user,
    @Args('data') data: CreateAddressDto,
  ) {
    try {
      return await this.AddresssService.create(data, user.id)
    } catch (error) {
      console.log(`error`, error)
      throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST)
    }
  }

  @Mutation(() => DeleteAddessOutputDto)
  @UseGuards(new AuthGuard())
  async deleteAddress(@Context('user') user, @Args('id') id: string) {
    try {
      return await this.AddresssService.deleteAddress(id, user.id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Mutation(() => Address)
  @UseGuards(new AuthGuard())
  async addDefaultAddress(
    @Context('user') user,
    @Args('data') data: CreateDefaultAddressDto,
  ) {
    try {
      return await this.AddresssService.addDefaultAddress(data, user.id)
    } catch (error) {
      console.log(`error`, error)
      throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST)
    }
  }
}
