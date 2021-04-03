import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Show } from './show-entity'
import { User } from './user-entity'

@ObjectType()
@Entity()
export class MessageEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number

  @ManyToOne((type) => Show)
  @JoinColumn({
    name: 'show_id',
  })
  readonly show: Show

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'author_id',
  })
  readonly author: User

  @Index('message-date')
  @Field()
  @Column({
    type: 'datetime',
  })
  readonly timestamp: Date

  @Field()
  @Column({
    type: 'text',
  })
  readonly message: string

  /* Copy user alias (nickname) here to avoid having to JOIN user object */
  @Field()
  @Column({
    type: 'nvarchar',
    length: 255,
  })
  readonly alias: string
}
