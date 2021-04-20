import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Brand } from '../../brands/entities/brand.entity'
import { Show } from '../../show/entities/show.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class ShowSegment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column()
  title: string

  @Field()
  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand

  @Field()
  @ManyToOne(() => Show)
  @JoinColumn({ name: 'show_id' })
  show: Show

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_user' })
  ownerUser: User

  // @Field()
  // @ManyToMany(() => Product)
  // @JoinColumn({
  //   name: 'product_id',
  // })
  // product: Product
}
