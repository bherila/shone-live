import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { LineItem } from '../../line-items/entities/line-item.entity'
import { Variant } from '../../variants/entities/variant.entity'

@ObjectType()
@Entity()
export class Sku {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column({ comment: 'sku name' })
  name: string

  @Field()
  @Column({ comment: 'Friendly name', name: 'friendly_name' })
  friendlyName: string

  @Field()
  @Column({ comment: 'Currency name' })
  COGS: string

  @Field()
  @Column({ comment: 'Quantity In Stock' })
  stock: number

  @Field(() => Variant)
  @ManyToOne(() => Variant)
  @JoinColumn({
    name: 'variant_id',
  })
  variant: Variant

  @Field(() => [LineItem], { nullable: true })
  @OneToMany(() => LineItem, (lineItem) => lineItem.order)
  skus: LineItem[]
}
