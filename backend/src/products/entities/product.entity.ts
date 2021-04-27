import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
  @Column({ comment: 'product name' })
  name: string

  @Field()
  @Column({ comment: 'product description' })
  description: string

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User

  @Field(() => [ShowSegment])
  @ManyToMany(
    () => ShowSegment,
    showSegment => showSegment.products,
  )
  @JoinTable({
    name: 'product_show_segments', // table name for the junction table of this relation
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'show_segment_id',
      referencedColumnName: 'id',
    },
  })
  showSegments: ShowSegment[]

  @Field({ nullable: true })
  @ManyToOne(() => Brand)
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brand
}
