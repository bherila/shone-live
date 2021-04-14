import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../../user/entities/user.entity'

@ObjectType()
@Entity()
export class ShowYourStyleEntry {
  @Field()
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Field({ name: 'video_url' })
  @Column({
    comment: 'Video URL',
    unique: true,
    name: 'video_url',
  })
  videoUrl: string

  @Field({ name: 'submitted_timestamp' })
  @CreateDateColumn({ type: 'timestamp', name: 'submitted_timestamp' })
  readonly submittedTimestamp: Date
}
