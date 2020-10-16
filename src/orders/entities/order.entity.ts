import { Address } from 'src/addresses/entities/address.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Show } from 'src/shows/entities/show.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { File } from '../../files/entities/file.entity';
import { OrderSku } from '../../order-skus/entities/order-sku.entity';
import { OrderStatus } from '../enums/order-status.enum';

@Entity()
export class Order {
  @PrimaryColumn({
    comment: 'stripe id is used to match 1 to 1',
  })
  id: string;

  @Column({
    comment: 'the order total amount in usd cents',
  })
  total_amount: number;

  @Column({
    comment: 'currently all orders in usd',
    default: 'usd',
  })
  currency: string;

  @Column({
    comment: 'email address if different from the customer default email',
    nullable: true,
  })
  email: string;

  // TODO: need to set up webhooks for enum update from stripe, basically these should never come directly from client unless/until client talks directly to stripe API
  @Column({
    comment:
      'always comes from stripe via webhook for now, we have enum but dont need to use while stripe makes it. is one of [created, paid, canceled, fulfilled, returned]',
    // nullable: true, // since we send to stripe first not sure if it should be nullable, but also might sometimes want to save failed records in the future w/o status (or maybe add our own status of failed_on_stripe)
    enum: OrderStatus,
  })
  status: string;

  @Column({
    comment:
      'datetime that order was created on stripe, in stripe this is just `created` but for us we rename so we save our created time eg 2020-12-01T00:00:00',
  })
  stripe_created: Date;

  @Column({
    comment:
      'datetime that order was updated on stripe, in stripe this is just `updated` but for us we rename so we save our updated time eg 2020-12-01T00:00:00',
  })
  stripe_updated: Date;

  @Column({
    comment: 'datetime that order was cancelled eg 2020-12-01T00:00:00',
    nullable: true,
  })
  cancelled: Date;

  @Column({
    comment: 'datetime that order was fulfiled eg 2020-12-01T00:00:00',
    nullable: true,
  })
  fulfiled: Date;

  @Column({
    comment: 'datetime that order was paid eg 2020-12-01T00:00:00',
    nullable: true,
  })
  paid: Date;

  @Column({
    comment: 'datetime that order was returned eg 2020-12-01T00:00:00',
    nullable: true,
  })
  returned: Date;

  @Column({
    comment:
      'the amount in cents that was returned if it wasnt the total order amount',
    nullable: true,
  })
  amount_returned: number;

  @OneToMany(
    type => OrderSku,
    orderSku => orderSku.order,
    {
      cascade: true,
    },
  )
  orderSkus: OrderSku[];

  @OneToMany(
    type => File,
    file => file.order,
    {
      cascade: true,
      nullable: true,
    },
  )
  files: File[];

  @ManyToOne(
    type => Address,
    address => address.orders,
  )
  address: Address;

  @ManyToOne(
    type => Show,
    show => show.orders,
  )
  show: Show;

  @ManyToOne(
    type => Card,
    card => card.orders,
  )
  card: Card;

  @ManyToOne(
    type => User,
    user => user.orders,
  )
  user: User;

  // TODO address
  // many to many address note as "order shipping" in join column (todo enumerate all the type of address columns: order-shipping, credit-card-billing, user-default, other?)
  // todo add a returns table to handle all that data, stripe has handling for this we can mirror
}
