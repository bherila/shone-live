import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Brand } from '../../brands/entities/brand.entity'
import { Product } from '../../products/entities/product.entity'
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

  @Field(() => Brand)
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

  @Field(() => [Product])
  @ManyToMany(
    () => Product,
    product => product.showSegments,
  )
  products: Product[]
}
