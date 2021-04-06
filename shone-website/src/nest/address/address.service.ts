import { Injectable } from '@nestjs/common'

import { UserRepository } from '../user/user.repository'
import { AddressRepository } from './address.repository'
import { CreateAddressDto } from './dto/create-address.dto'
import { Address } from './entities/address.entity'

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepository, // private readonly userRepository: UserRepository,
  ) {}

  async create(addressData: CreateAddressDto): Promise<Address> {
    // const find_user = await this.userRepository.findOne(addressData.user_id)
    const address = this.addressRepository.create({
      ...addressData,
      // user: find_user,
    })
    return await this.addressRepository.save(address)
  }

  findOne(AddressId) {
    return this.addressRepository.findOne(AddressId)
  }

  findAll() {
    return this.addressRepository.find()
  }
}
