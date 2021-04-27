import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class Brand {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column({ comment: 'brand name' })
  name: string

  @Field()
  @Column({ comment: 'brand description' })
  description: string

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_user' })
  ownerUser: User
}
