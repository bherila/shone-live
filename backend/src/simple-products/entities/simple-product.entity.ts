import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  Generated,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { File } from "../../files/entities/file.entity";
import { Show } from "../../shows/entities/show.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class SimpleProduct {
  @PrimaryGeneratedColumn({
    comment: "private internal ID, actual primary key"
  })
  @Exclude()
  _id: number;

  @Index()
  @Column({
    comment: "public ID, for use by client (is a UUID)"
  })
  @Generated("uuid")
  id: string;

  @Column({
    comment: `the id of the Stripe Price Object needed for checkout
    https://stripe.com/docs/api/prices`,
    nullable: true
  })
  stripe_price_id: string;

  @Column({
    comment: "product name"
  })
  name: string;

  @Column({
    comment: "product description"
  })
  description: string;

  @Column({
    comment: "retail price in cents (eg $1.00 should be 100)"
  })
  price: number;

  @Column({
    comment: `quantity available to sell for associated show
      - set once at the start of the show
      - cannot update after show starts`
  })
  quantity: number;

  @Column({
    comment: `quantity that has been sold.
    - updated after each successful transaction.
    - only modified directly by the server`,
    default: 0
  })
  quantity_sold: number;

  @Column({
    comment:
      `determines if the product should be shown to the customer` +
      `so they can purchase it` +
      `defaults to false`,
    default: false
  })
  available_for_purchase: boolean;

  @ManyToOne(
    type => User,
    user => user.simpleProducts,
    { cascade: ["insert", "update"] }
  )
  user: User;

  @ManyToOne(
    type => Show,
    show => show.simpleProducts,
    { cascade: ["insert", "update"] }
  )
  show: Show;

  @OneToMany(
    type => File,
    File => File.simpleProduct,
    { cascade: true }
  )
  files: File[];
}
