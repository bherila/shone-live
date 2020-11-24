import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAddress } from '../user-addresses/user-address.entity';
import { User } from '../users/entities/user.entity';
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

  async create(
    createAddressDto: CreateAddressDto,
    user?: User,
  ): Promise<Address> {
    let find_user = user;
    if (!find_user) {
      find_user = await this.userRepository.findOne(createAddressDto.user_id);
    }
    if (!find_user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    const address = this.addressRepository.create({
      ...createAddressDto,
    });
    const savedAddress = await this.addressRepository.save(address);
    const userAddress = this.userAddressRepository.create({
      user: find_user,
      address: savedAddress,
    });

    await this.userAddressRepository.save(userAddress);

    return savedAddress;
  }
}
