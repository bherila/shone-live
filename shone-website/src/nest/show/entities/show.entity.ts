import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { MessageEntity } from '../../message/entities/message.entity'

@ObjectType()
@Entity()
export class Show {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column()
  title: string

  @Field({
    name: 'image_url',
  })
  @Column({
    name: 'image_url',
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
