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
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column({
    comment: 'Consumer Lead email',
    unique: true,
  })
  email: string

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  readonly submitted_timestamp: Date
}
