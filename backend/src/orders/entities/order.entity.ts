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
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column({ comment: 'order name' })
  name: string

  @Field()
  @Column({ comment: 'order description' })
  description: string

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User

  @Field(() => [LineItem], { nullable: true })
  @OneToMany(
    () => LineItem,
    lineItem => lineItem.order,
  )
  lineItems: LineItem[]
}
