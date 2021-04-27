import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Brand } from '../../brands/entities/brand.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class UserBrandRole {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column()
  read: boolean

  @Field()
  @Column()
  write: boolean

  @Field()
  @Column()
  admin: boolean

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Field(() => Brand)
  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand
}
