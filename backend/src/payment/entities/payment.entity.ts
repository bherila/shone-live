import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Product } from '../../products/entities/product.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class Payment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User

  @Field()
  @Column()
  quantity: number
}
