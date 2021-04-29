import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Brand } from '../../brands/entities/brand.entity'
import { Order } from '../../orders/entities/order.entity'
import { ShowSegment } from '../../show-segment/entities/show-segment.entity'
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

  @Field(() => Brand)
  @ManyToOne(() => Brand)
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brand

  @Field(() => ShowSegment)
  @ManyToOne(() => ShowSegment)
  @JoinColumn({
    name: 'show_segment_id',
  })
  showSegment: ShowSegment
}
