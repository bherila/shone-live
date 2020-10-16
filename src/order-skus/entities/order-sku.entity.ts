import { Order } from 'src/orders/entities/order.entity';
import { Sku } from 'src/skus/entities/sku.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class OrderSku {
  @ManyToOne(
    type => Order,
    order => order.orderSkus,
    {
      cascade: ['insert', 'update'],
      primary: true,
    },
  )
  order: Order;

  @ManyToOne(
    type => Sku,
    sku => sku.orderSkus,
    {
      cascade: ['insert', 'update'],
      primary: true,
    },
  )
  sku: Sku;

  @Column({
    comment: 'number of units purchased',
  })
  quantity: number;
}
