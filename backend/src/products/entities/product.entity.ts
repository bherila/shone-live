import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Show } from '../../show/entities/show.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class Product {
  @Field()
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column({
    comment: 'product name',
  })
  name: string

  @Field()
  @Column({
    comment: 'product description',
  })
  description: string

  // @Column({
  //     comment: "base retail price for the show",
  // })
  // price: number;

  // @Column({
  //     comment: "quantity available to sell for associated show",
  // })
  // quantity: number;

  // @Column({
  //     comment: "currently available quantity. updated after each successful transaction"
  // })
  // current_quantity: number;

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User

  @Field()
  @ManyToOne(() => Show)
  @JoinColumn({
    name: 'show_id',
  })
  show: Show

  // @Field()
  // @ManyToOne(() => Payment)
  // paymnet: Payment
}
