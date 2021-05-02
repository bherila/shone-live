import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { MessageEntity } from '../../message/entities/message.entity'
import { ShowSegment } from '../../show-segment/entities/show-segment.entity'
import { User } from '../../user/entities/user.entity'
import { UserShowRole } from '../../user-show-role/entities/user-show-role.entity'

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

  @Field(() => [ShowSegment], { nullable: true })
  @OneToMany(() => ShowSegment, (showSegment) => showSegment.show)
  showSegments: ShowSegment[]

  @Field(() => [UserShowRole], { nullable: true })
  @OneToMany(() => UserShowRole, (userShowRole) => userShowRole.show)
  userShowRoles: UserShowRole[]

  @Field({ name: 'owner_user' })
  @JoinColumn({ name: 'owner_user_id' })
  ownerUser: User

  @Field({ name: 'is_broadcasting' })
  @Column('boolean', { default: false })
  isBroadcasting: boolean
}
