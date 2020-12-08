import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../../orders/entities/order.entity';
import { PrivateFile } from '../../private-files/entities/private-file.entity';
import { Product } from '../../products/entities/product.entity';
import { Sku } from '../../skus/entities/sku.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  // ALL DATE-TIME WILL BE STORED IN UTC
  // TODO: WE MUST TRANSFORM ALL LOCAL TIMEZONE ON THE SERVER
  @Column({
    comment: 'datetime that show is scheduled for in eg 2020-12-01T00:00:00',
  })
  date: Date;

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
    comment: 'anticipated/approximate length of show in seconds',
  })
  length: number;

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
    type => PrivateFile,
    privateFile => privateFile.show,
    {
      cascade: true,
    },
  )
  privateFiles: PrivateFile[];
}
