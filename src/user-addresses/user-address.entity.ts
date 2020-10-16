import { Address } from 'src/addresses/entities/address.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

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
