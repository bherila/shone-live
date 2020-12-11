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
export class File {
  @PrimaryGeneratedColumn({
    comment: `private internal ID, actual primary key`,
  })
  @Exclude()
  _id: number;

  @Column({ comment: `public ID, for use by client (is a UUID)` })
  @Generated('uuid')
  id: string;

  @Column({
    comment: `this key is the AWS S3 id
  it is used in interacting with the file through the AWS API
  for example files are deleted by finding them by this key`,
  })
  @Exclude()
  public key: string;

  @Column({
    comment: `is the file public or private
  - public files have a permanent pubic url with no authorization
  - private files have a URL that requires access authorization`,
    default: false,
  })
  public is_public: boolean;

  @Column({
    comment: `this is the URL generated at the time the file is created in AWS`,
    nullable: true,
  })
  public url: string;

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
