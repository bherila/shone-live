import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity({ name: 'payment_methods' })
export class PaymentMethodEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  userId: User

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  readonly timestamp: Date

  @Field()
  @Column({
    type: 'text',
  })
  paymentMethodId: string

  @Field()
  @Column({
    type: 'text',
  })
  addressId: string

  @Field()
  @Column({
    type: 'text',
  })
  cardName: string

  @Field({ name: 'is_deleted' })
  @Column('boolean', { default: false })
  isDeleted: boolean
}
