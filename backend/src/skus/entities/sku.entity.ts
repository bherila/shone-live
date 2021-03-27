import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { File } from "../../files/entities/file.entity";
import { OrderSku } from "../../order-skus/entities/order-sku.entity";
import { Product } from "../../products/entities/product.entity";
import { Show } from "../../shows/entities/show.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Sku {
  @PrimaryColumn({
    comment: "stripe id is used to match 1 to 1"
  })
  id: string;

  @Column({
    comment:
      "price (in cents) is kept on SKU instead of products in case variants are priced differently, this is also to mirror Stripe "
  })
  price: number;

  @Column({
    comment: "the currency for the price, now all prices in usd",
    default: "usd"
  })
  currency: string;

  @Column({
    comment:
      "time it starts being available for purchase, SKUs should exist from start of show until end of show (note a SKU can be still active, but sold out)",
    nullable: true
  })
  active_at: Date;

  @Column({
    comment:
      "time it ends being available for purchase, SKUs should exist from start of show until end of show (note a SKU can be still active, but sold out)",
    nullable: true
  })
  inactive_at: Date;

  // attributes: {
  //   size: "Medium",
  //   gender: "Unisex"
  // },
  @Column({
    comment: `any descriptive details that it permutes on eg {"size": "medium", "gender": "unisex"}`,
    nullable: true,
    type: "text"
  })
  attributes: string;

  //     // stripe supports more multi-faceted inventory types, but we always use limited for now
  //     //      inventory: {
  //     //          type: "finite",
  //     //          quantity: product.quantity,
  //     //        },
  //     @Column({
  //         comment: `type is defaulted to finite for now, no near plans to change, mirroring stripe`,
  //         default: "finite",
  //     })
  //     inventory_type: string;

  @Column({
    comment: "how many of this SKU are available at show start"
  })
  quantity: number;

  @Column({
    comment:
      "currently available quantity. updated after each successful transaction"
  })
  current_quantity: number;

  @ManyToOne(
    type => Product,
    product => product.skus,
    {
      cascade: ["insert", "update"]
    }
  )
  product: Product;

  @OneToMany(
    type => File,
    file => file.show,
    {
      cascade: true
    }
  )
  files: File[];

  // these are SKUs a buyer ordered
  @OneToMany(
    type => OrderSku,
    orderSku => orderSku.sku,
    {
      cascade: true
    }
  )
  orderSkus: OrderSku[];

  // these are SKUs a seller added
  @ManyToOne(
    type => User,
    user => user.skus,
    { cascade: ["insert", "update"] }
  )
  user: User;

  // this returns all the SKUs for a show grouped by show returned on the user
  // https://typeorm.io/#/relations-faq/how-to-use-relation-id-without-joining-relation
  @Column({ nullable: true })
  showId: number;
  @ManyToOne(
    type => Show,
    show => show.skus,
    {
      cascade: ["insert", "update"]
    }
  )
  show: Show;
}
