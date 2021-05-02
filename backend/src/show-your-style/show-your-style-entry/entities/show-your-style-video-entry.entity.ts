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
export class ShowYourStyleVideoIdEntry {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly entry_id: number

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Field({ name: 'video_id' })
  @Column({
    comment: 'Video Id',
    unique: true,
    name: 'video_id',
  })
  videoId: string

  @Field({ name: 'entry_timestamp' })
  @CreateDateColumn({ type: 'timestamp', name: 'entry_timestamp' })
  readonly entryTimestamp: Date

  @Field({ nullable: true, name: 'video_url' })
  @Column({
    comment: 'Video URL',
    unique: true,
    name: 'video_url',
    default: null,
  })
  videoUrl: string

  @Field({ name: 'is_viewable' })
  @Column('boolean', { default: false })
  isViewable: boolean

  @Field({ nullable: true, name: 'error' })
  @Column({ default: null })
  error: string

  @Field({ nullable: true, name: 'json_data' })
  @Column({ type: 'text', default: null })
  jsonData: string

  @Field({ nullable: true, name: 'urls' })
  @Column({ default: null })
  urls: string

  @Field({ name: 'inactive_date', nullable: true })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'inactive_date',
    default: null,
    nullable: true,
  })
  inactiveDate: Date
}
