import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../../user/entities/user.entity'
import { ShowYourStyleEntry } from '../../show-your-style-entry/entities/show-your-style-entry.entity'

@ObjectType()
@Entity()
@Index((relation: ShowYourStyleVote) => [relation.entry, relation.user], {
  unique: true,
})
export class ShowYourStyleVote {
  @Field()
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @ManyToOne(() => ShowYourStyleEntry)
  @JoinColumn({ name: 'entry_id' })
  entry: ShowYourStyleEntry

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Field()
  @Column({ comment: 'Vote number from 1 to 5' })
  vote: number

  @Field({ name: 'view_duration' })
  @Column({ name: 'view_duration' })
  readonly viewDuration: number
}
