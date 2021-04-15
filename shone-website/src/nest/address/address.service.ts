import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { AddressRepository } from './address.repository'
import { CreateAddressDto } from './dto/create-address.dto'
import { Address } from './entities/address.entity'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: AddressRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(
    addressData: CreateAddressDto,
    userId: string,
  ): Promise<Address> {
    const user = await this.userRepository.findOne(userId)
    delete addressData.userId
    const address = this.addressRepository.create({
      user,
      ...addressData,
    })
    return await this.addressRepository.save(address)
  }

  findOne(AddressId, userId) {
    return this.addressRepository.findOne(AddressId, {
      relations: ['user'],
      where: { user: { id: userId } },
    })
  }
  findAll(userId) {
    return this.addressRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    })
  }
}
