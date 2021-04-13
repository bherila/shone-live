import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
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
  user: User

  @Field()
  @Column({
    comment: 'Video URL',
    unique: true,
  })
  video_url: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  readonly submitted_timestamp: Date
}
