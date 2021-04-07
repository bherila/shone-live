import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Address } from '../../address/entities/address.entity'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Index({
    unique: true,
  })
  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string

  // @Field(() => [Address], { nullable: true })
  // @OneToMany(() => Address, (address) => address.user)
  // address: Address[]

  @Index({
    unique: true,
  })
  @Field()
  @Column()
  phone: string

  @Index({
    unique: true,
  })
  @Field()
  @Column()
  username: string

  @Column({ nullable: true })
  verificationCode: string

  @Field()
  @Column()
  verificationCodeTimeSent: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  token: string
}

@ObjectType()
@Entity()
export class UserWithToken {
  @Field()
  token: string
}
