import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { MessageEntity } from '../../message/entities/message.entity'
import { User } from '../../user/entities/user.entity'

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

  // @Field(() => [ShowSegment], { nullable: true })
  // @OneToMany(() => ShowSegment, (showSegment) => showSegment.show)
  // showSegment: ShowSegment[]

  // @Field(() => [UserShowRole], { nullable: true })
  // @OneToMany(() => UserShowRole, (userBrandRole) => userBrandRole.show)
  // userBrandRole: UserShowRole[]

  @Field({ name: 'owner_user' })
  @JoinColumn({ name: 'owner_user_id' })
  ownerUser: User
}
