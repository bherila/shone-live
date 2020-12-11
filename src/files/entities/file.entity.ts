import { Exclude } from 'class-transformer';
import {
  Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Show } from '../../shows/entities/show.entity';
import {
  SimpleProduct,
} from '../../simple-products/entities/simple-product.entity';
import { Sku } from '../../skus/entities/sku.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
// see s3file.entity.ts for public file
// public files have a URL because they can be accessed
// by anyone at any time at their URL
// private files on AWS have none,
// because these files have a time limited URL
// should transition to only let server get these files
// and returnt them thru server so can control access w/ token
export class File {
  @PrimaryGeneratedColumn({
    comment: 'private internal ID, actual primary key',
  })
  @Exclude()
  _id: number;

  @Column({ comment: 'public ID, for use by client (is a UUID)' })
  @Generated('uuid')
  id: string;

  @Column()
  public key: string;

  @ManyToOne(
    type => User,
    (user: User) => user.files,
  )
  public user: User;

  @ManyToOne(
    type => Show,
    show => show.files,
    { cascade: ['insert', 'update'] },
  )
  show: Show;

  @ManyToOne(
    type => Product,
    product => product.files,
    { cascade: ['insert', 'update'] },
  )
  product: Product;

  @ManyToOne(
    type => SimpleProduct,
    simpleProduct => simpleProduct.files,
    { cascade: ['insert', 'update'] },
  )
  simpleProduct: SimpleProduct;

  @ManyToOne(
    type => Sku,
    sku => sku.files,
    { cascade: ['insert', 'update'] },
  )
  sku: Sku;
}
