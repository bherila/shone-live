import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Show } from 'src/shows/entities/show.entity';
import { Sku } from 'src/skus/entities/sku.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';

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
    type => Show,
    show => show.files,
    {
      cascade: ['insert', 'update'],
    },
  )
  show: Show;

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
