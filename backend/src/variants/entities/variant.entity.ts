import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Product } from '../../products/entities/product.entity'
import { Sku } from '../../skus/entities/sku.entity'

@ObjectType()
@Entity()
export class Variant {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column({ comment: 'variant name' })
  name: string

  @Field()
  @Column({ comment: 'variant description' })
  description: string

  @Field(() => Product)
  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product

  @Field(() => [Sku], { nullable: true })
  @OneToMany(
    () => Sku,
    sku => sku.variant,
  )
  skus: Sku[]
}
