import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Brand } from '../../brands/entities/brand.entity'
import { ShowSegment } from '../../show-segment/entities/show-segment.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class Product {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

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

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User

  @Field()
  @ManyToOne(() => ShowSegment)
  @JoinColumn({
    name: 'show_segment_id',
  })
  showSegment: ShowSegment

  @Field()
  @ManyToOne(() => Brand)
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brand
}
