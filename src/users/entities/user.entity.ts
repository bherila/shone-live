import {
  Check, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn,
} from 'typeorm';

import { Auth } from '../../auth/entities/auth.entity';
import { Card } from '../../cards/entities/card.entity';
import { S3File } from '../../files-aws/entities/s3file.entity';
import { File } from '../../files/entities/file.entity';
import { Order } from '../../orders/entities/order.entity';
import PrivateFile from '../../private-file/entities/private-file.entity';
import { Product } from '../../products/entities/product.entity';
import { Show } from '../../shows/entities/show.entity';
import { UserAddress } from '../../user-addresses/user-address.entity';

@Check(`"email" IS NOT NULL OR "phone" IS NOT NULL`)
@Entity() // sql table === 'user'
export class User {
  @PrimaryColumn({
    comment: 'stripe id is used to match 1 to 1',
  })
  id: string;

  @Column({
    unique: true,
    comment: 'display username for use in the app',
    nullable: true,
  })
  username: string;

  @Column({
    comment: 'users first name',
    nullable: true,
  })
  first_name: string;

  @Column({
    comment: 'users last name',
    nullable: true,
  })
  last_name: string;

  @Column({
    unique: true,
    comment: 'users phone number',
    nullable: true,
  })
  phone: string;

  @Column({
    comment: 'used for various authorizations sellers must be validated',
    nullable: true,
  })
  seller: boolean;

  @Column({
    unique: true,
    comment: 'email used for unique user identification',
    nullable: true,
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

  @JoinColumn()
  @OneToOne(() => S3File, {
    eager: true,
    nullable: true,
  })
  public avatar?: S3File;

  @OneToMany(
    () => PrivateFile,
    (file: PrivateFile) => file.owner,
  )
  public privateFiles: PrivateFile[];

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
