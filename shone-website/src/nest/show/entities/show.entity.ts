import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Brand } from '../../brands/entities/brand.entity'
import { MessageEntity } from '../../message/entities/message.entity'

@ObjectType()
@Entity()
export class Show {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column()
  title: string

  @Field({
    name: 'image_url',
    nullable: true,
  })
  @Column({
    name: 'image_url',
    nullable: true,
  })
  imageUrl: string

  @Field({ name: 'start_date' })
  @Column({ name: 'start_date' })
  startDate: Date

  @Field({ name: 'end_date' })
  @Column({ name: 'end_date' })
  endDate: Date

  @Field(() => [MessageEntity], { nullable: true })
  @OneToMany(() => MessageEntity, (message) => message.show)
  chatMessages: MessageEntity[]

}
