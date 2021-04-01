import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Show } from '../show/show-entity'
import { User } from '../user/user-entity'

@ObjectType()
@Entity()
export class MessageEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number

  @ManyToOne(() => Show)
  @JoinColumn({
    name: 'show_id',
  })
  show: Show

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'author_id',
  })
  author: User

  @Index('message-date')
  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  readonly timestamp: Date

  @Field()
  @Column({
    type: 'text',
  })
  message: string

  /* Copy user alias (nickname) here to avoid having to JOIN user object */
  @Field()
  @Column({
    type: 'nvarchar',
    length: 255,
  })
  alias: string
}
