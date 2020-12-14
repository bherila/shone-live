import { Exclude } from 'class-transformer';
import {
  Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { File } from '../../files/entities/file.entity';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import {
  SimpleProduct,
} from '../../simple-products/entities/simple-product.entity';
import { Sku } from '../../skus/entities/sku.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn({
    comment: `private internal ID, actual primary key`,
  })
  @Exclude()
  _id: number;

  @Column({ comment: `public ID, for use by client (is a UUID)` })
  @Generated('uuid')
  id: string;

  @Column({
    comment: 'datetime that show is scheduled to start eg 2020-12-01T00:00:00',
  })
  scheduled_start: Date;

  @Column({
    comment: 'datetime that show is scheduled to end eg 2020-12-01T00:00:00',
  })
  scheduled_end: Date;

  @Column({
    comment: 'datetime that show actually started in eg 2020-12-01T00:00:00',
    nullable: true,
  })
  start: Date;

  @Column({
    comment: 'datetime that show actually ended in eg 2020-12-01T00:00:00',
    nullable: true,
  })
  end: Date;

  @Column({
    comment: 'seller generated description of show',
  })
  description: string;

  // todo, may want to allow recurring show names
  @Column({
    comment: 'seller generated name of show',
  })
  name: string;

  // if many to many we we use join table and note it on the owner
  // @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
  @ManyToOne(
    type => User,
    user => user.shows, // what is "show" within the User Entity
    {
      cascade: ['insert', 'update'],
    },
  )
  user: User;

  @OneToMany(
    type => Product,
    product => product.show,
    {
      cascade: true,
    },
  )
  products: Product[];

  @OneToMany(
    type => SimpleProduct,
    simpleProduct => simpleProduct.show,
    {
      cascade: true,
    },
  )
  simpleProducts: SimpleProduct[];

  @OneToMany(
    type => Sku,
    sku => sku.show,
    {
      cascade: true,
    },
  )
  skus: Sku[];

  @OneToMany(
    type => Order,
    order => order.show,
    {
      cascade: true,
    },
  )
  orders: Order[];

  @OneToMany(
    type => File,
    file => file.show,
    {
      cascade: true,
    },
  )
  files: File[];
}
