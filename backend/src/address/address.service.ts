import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
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

  async deleteAddress(id, authenticatedUserId) {
    const address = await this.addressRepository.findOrFail(id)

    // check address is owned by the user
    if (address.user.id !== authenticatedUserId) {
      throw new ForbiddenException('Address is not owned by the user')
    }

    //check if address is already deleted
    if (address.isDeleted) {
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
    const user = await this.userRepository.findOrFail(userId)
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
