import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Show } from '../../show/entities/show.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class UserShowRole {
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

  @Field()
  @OneToOne(() => Show)
  @JoinColumn({ name: 'show_id' })
  show: Show
}
