import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class Address {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({
    comment: 'city where address is located',
  })
  city: string

  @Field()
  @Column({
    comment:
      '2 character country code https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements',
    default: 'US',
  })
  country: string

  @Field()
  @Column({
    comment: 'first line of address, usually number and street name',
  })
  line1: string

  @Field()
  @Column({
    comment: 'second line of address, eg appartment or suite etc',
    nullable: true,
  })
  line2: string

  @Field({
    name: 'postal_code',
  })
  @Column({
    comment: 'for usa is zip code, should be verified against list',
    nullable: true,
    name: 'postal_code',
  })
  postalCode: string

  @Field()
  @Column({
    comment: 'for usa should be 2 character abreviation verified against list',
    nullable: true,
  })
  state: string

  @Field()
  @Column({
    comment: 'name of addressee at that address, doesnt have to be customers',
    nullable: true,
  })
  name: string

  @Field()
  @Column({
    comment: 'phone of addressee at that address, doesnt have to be customers',
    nullable: true,
  })
  phone: string

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User

  @Field({ name: 'is_deleted' })
  @Column('boolean', { default: false })
  isDeleted: boolean
}
