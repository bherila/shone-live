import { Field, ObjectType } from '@nestjs/graphql'
import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../../user/entities/user.entity'
import { ShowYourStyleEntry } from '../../show-your-style-entry/entities/show-your-style-entry.entity'

@ObjectType()
@Entity()
@Index((relation: ShowYourStyleViewRecord) => [relation.entry, relation.user], {
  unique: true,
})
export class ShowYourStyleViewRecord {
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
  @CreateDateColumn({ type: 'timestamp' })
  readonly view_time: Date
}
