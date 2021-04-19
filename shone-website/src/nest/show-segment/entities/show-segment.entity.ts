import { Field, ObjectType } from '@nestjs/graphql'
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Brand } from '../../brands/entities/brand.entity'
import { Show } from '../../show/entities/show.entity'

@ObjectType()
@Entity()
export class ShowSegment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand

  @Field()
  @ManyToOne(() => Show)
  @JoinColumn({ name: 'show_id' })
  show: Show
}
