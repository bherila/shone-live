import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Auth } from '../../auth/entities/auth.entity';
import { Card } from '../../cards/entities/card.entity';
import { File } from '../../files/entities/file.entity';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { Show } from '../../shows/entities/show.entity';
import { UserAddress } from '../../user-addresses/user-address.entity';

@Entity() // sql table === 'user'
export class User {
  @PrimaryColumn({
    comment: 'stripe id is used to match 1 to 1',
  })
  id: string;

  @Column({
    unique: true,
    comment: 'display username for use in the app',
  })
  username: string;

  @Column({
    comment: 'users first name',
  })
  first_name: string;

  @Column({
    comment: 'users last name',
  })
  last_name: string;

  @Column({
    unique: true,
    comment: 'users phone number',
  })
  phone: string;

  @Column({
    comment: 'used for various authorizations sellers must be validated',
  })
  seller: boolean;

  @Column({
    unique: true,
    comment: 'email used for unique user identification',
  })
  email: string;

  // TODO: add address and then address association

  @OneToMany(
    type => Card,
    card => card.user,
    {
      cascade: true,
    },
  )
  cards: Card[];

  @OneToMany(
    type => Show,
    show => show.user,
    {
      cascade: true,
    },
  )
  shows: Show[];

  @OneToMany(
    type => Auth,
    auth => auth.user,
    {
      cascade: true,
    },
  )
  auths: Auth[];

  @OneToMany(
    type => Product,
    product => product.user,
    {
      cascade: true,
    },
  )
  products: Product[];

  @OneToMany(
    type => File,
    file => file.user,
    {
      cascade: true,
    },
  )
  files: File[];

  @OneToMany(
    order => Order,
    order => order.user,
  )
  orders: Order[];

  @OneToMany(
    type => UserAddress,
    userAddress => userAddress.user,
    {
      cascade: true,
    },
  )
  userAddresses: UserAddress[];
}
