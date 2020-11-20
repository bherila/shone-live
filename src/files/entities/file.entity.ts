import {
  Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { Sku } from '../../skus/entities/sku.entity';
import { User } from '../../users/entities/user.entity';

// todo make it work on AWS, won't be trivial
// maybe minio is easier for this since it supports
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    comment: 'the name of the file, must be unique',
  })
  name: string;

  @Column({
    comment: 'the type of the associated object eg product, show, user, sku',
  })
  type: string;

  @ManyToOne(
    type => User,
    user => user.files,
    {
      cascade: ['insert', 'update'],
    },
  )
  user: User;

  @ManyToOne(
    type => Product,
    product => product.files,
    {
      cascade: ['insert', 'update'],
    },
  )
  product: Product;

  @ManyToOne(
    type => Order,
    order => order.files,
    {
      cascade: ['insert', 'update'],
    },
  )
  order: Order;

  @OneToOne(
    type => Sku,
    sku => sku.file,
    {
      cascade: ['insert', 'update'],
    },
  )
  sku: Sku;
}
