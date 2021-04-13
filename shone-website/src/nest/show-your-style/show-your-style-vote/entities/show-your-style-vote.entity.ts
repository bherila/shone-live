import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  Index,
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
  entry: ShowYourStyleEntry

  @Field()
  @ManyToOne(() => User)
  user: User

  @Field()
  @Column({
    // @TODO comment: 'Consumer Lead email',
  })
  vote: number

  @Field()
  @Column({
    // @TODO comment: 'Consumer Lead email',
  })
  readonly view_duration: number
}
