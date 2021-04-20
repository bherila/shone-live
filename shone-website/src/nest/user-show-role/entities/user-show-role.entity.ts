import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Show } from '../../show/entities/show.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
@Index((relation: UserShowRole) => [relation.user, relation.show], {
  unique: true,
})
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

  @Field({ name: 'stream_to' })
  @Column({ name: 'stream_to' })
  streamTo: boolean

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Field()
  @ManyToOne(() => Show)
  @JoinColumn({ name: 'show_id' })
  show: Show
}
