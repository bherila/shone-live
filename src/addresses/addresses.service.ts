import { UserAddress } from 'src/user-addresses/user-address.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAddressDto: CreateAddressDto, user?: User) {
    if (!user) {
      const user = await this.userRepository.findOne(createAddressDto.user); // should be userId
    }
    const address = this.addressRepository.create({
      user: user,
      ...createAddressDto,
    });
    const savedAddress = await this.addressRepository.save(address);
    const userAddress = this.userAddressRepository.create({
      user: user,
      address: savedAddress,
    });

    await this.userAddressRepository.save(userAddress);

    return savedAddress;
  }
}
