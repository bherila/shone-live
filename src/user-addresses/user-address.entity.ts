import { Entity, ManyToOne } from 'typeorm';

import { Address } from '../addresses/entities/address.entity';
import { User } from '../users/entities/user.entity';

@Entity()
export class UserAddress {
  @ManyToOne(
    type => User,
    user => user.userAddresses,
    {
      cascade: ['insert', 'update'],
      primary: true,
    },
  )
  user: User;

  @ManyToOne(
    type => Address,
    address => address.userAddresses,
    {
      cascade: ['insert', 'update'],
      primary: true,
    },
  )
  address: Address;
}
