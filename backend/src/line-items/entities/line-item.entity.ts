import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Order } from '../../orders/entities/order.entity'
import { Sku } from '../../skus/entities/sku.entity'

@ObjectType()
@Entity()
export class LineItem {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column({ comment: 'lineitems description' })
  amount: number

  @Field(() => Order)
  @ManyToOne(() => Order)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order

  @Field()
  @ManyToOne(() => Sku)
  @JoinColumn({
    name: 'sku_id',
  })
  sku: Sku
}
