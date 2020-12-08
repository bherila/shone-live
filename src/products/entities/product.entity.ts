import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { File } from '../../files/entities/file.entity';
import { PrivateFile } from '../../private-files/entities/private-file.entity';
import { Show } from '../../shows/entities/show.entity';
import { Sku } from '../../skus/entities/sku.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Product {
  @PrimaryColumn({
    comment: 'stripe id is used to match 1 to 1',
  })
  id: string;

  @Column({
    comment: 'product name',
  })
  name: string;

  @Column({
    comment: 'product description',
  })
  description: string;

  // @Column({
  //     comment: "base retail price for the show",
  // })
  // price: number;

  // @Column({
  //     comment: "quantity available to sell for associated show",
  // })
  // quantity: number;

  // @Column({
  //     comment: "currently available quantity. updated after each successful transaction"
  // })
  // current_quantity: number;

  // if many to many we we use join table and note it on the owner
  // @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
  @ManyToOne(
    type => User,
    user => user.products, // what is "product" within the User Entity
    {
      cascade: ['insert', 'update'],
    },
  )
  user: User;

  @ManyToOne(
    type => Show,
    show => show.products,
    {
      cascade: ['insert', 'update'],
    },
  )
  show: Show;

  @OneToMany(
    type => File,
    file => file.product, // what is "product" within the File Entity
    {
      cascade: true,
    },
  )
  files: File[];

  @OneToMany(
    type => PrivateFile,
    privateFile => privateFile.show,
    {
      cascade: true,
    },
  )
  privateFiles: PrivateFile[];

  @OneToMany(
    type => Sku,
    sku => sku.product,
    {
      cascade: true,
    },
  )
  skus: Sku[];
}
