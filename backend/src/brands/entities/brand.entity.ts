import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { ShowSegment } from '../../show-segment/entities/show-segment.entity'
import { User } from '../../user/entities/user.entity'
import { UserBrandRole } from '../../user-brand-role/entities/user-brand-role.entity'

@ObjectType()
@Entity()
export class Brand {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column({ comment: 'brand name' })
  name: string

  @Field()
  @Column({ comment: 'brand description' })
  description: string

  @Field(() => [ShowSegment], { nullable: true })
  @OneToMany(
    () => ShowSegment,
    showSegment => showSegment.brand,
  )
  showSegments: ShowSegment[]

  @Field(() => [UserBrandRole], { nullable: true })
  @OneToMany(
    () => UserBrandRole,
    userBrandRole => userBrandRole.brand,
  )
  userBrandRoles: UserBrandRole[]

  @Field()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_user' })
  ownerUser: User
}
