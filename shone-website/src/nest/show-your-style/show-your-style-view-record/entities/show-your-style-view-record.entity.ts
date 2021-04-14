import { Field, ObjectType } from '@nestjs/graphql'
import {
  CreateDateColumn,
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
@Index((relation: ShowYourStyleViewRecord) => [relation.entry, relation.user], {
  unique: true,
})
export class ShowYourStyleViewRecord {
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

  @Field({ name: 'view_time' })
  @CreateDateColumn({ type: 'timestamp', name: 'view_time' })
  readonly viewTime: Date
}
