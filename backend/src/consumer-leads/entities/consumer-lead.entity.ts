import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class ConsumerLead {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column({
    comment: 'Consumer Lead email',
    unique: true,
  })
  email: string

  @Field({ name: 'submitted_timestamp' })
  @CreateDateColumn({ type: 'timestamp', name: 'submitted_timestamp' })
  readonly submittedTimestamp: Date
}
