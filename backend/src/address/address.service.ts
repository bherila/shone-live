import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { message } from '../common/message'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { AddressRepository } from './address.repository'
import { CreateAddressDto } from './dto/create-address.dto'
import { CreateDefaultAddressDto } from './dto/create-default-address-dto'
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

  async deleteAddress(id, userId) {
    await this.userRepository.findOneOrFail(userId)
    await this.addressRepository.findOneOrFail(id)

    //check for address is already deleted
    const getAddressDetails = await this.addressRepository.findOne({
      id,
      isDeleted: true,
    })

    if (getAddressDetails) {
      throw new InternalServerErrorException(
        `Address for id - ${id} is already deleted`,
      )
    }

    await this.addressRepository.update(
      { id },
      {
        isDeleted: true,
      },
    )

    return { msg: message.addressDeletionSuccess }
  }

  async addDefaultAddress(
    addressData: CreateDefaultAddressDto,
    userId: string,
  ): Promise<Address> {
    const user = await this.userRepository.findOneOrFail(userId)
    const address = this.addressRepository.create({
      user,
      ...addressData,
    })

    const addedAddress = await this.addressRepository.save(address)
    await this.userRepository.update(
      { id: userId },
      {
        defaultAddressId: addedAddress.id,
      },
    )
    return addedAddress
  }
}
