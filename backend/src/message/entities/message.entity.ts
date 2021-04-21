import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Show } from '../../show/entities/show.entity'
import { User } from '../../user/entities/user.entity'

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

  @Index('ix_message_date')
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
    name: 'author_alias',
    type: 'nvarchar',
    length: 255,
    nullable: false,
  })
  alias: string
}
