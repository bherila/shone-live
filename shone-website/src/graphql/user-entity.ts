import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column()
  email: string

  @Field()
  @Column()
  phone: string

  @Field()
  @Column()
  username: string

  @Column({ nullable: true })
  verificationCode!: number

  @Field()
  @Column()
  verificationCodeTimeSent: string
}

export class NewUser {
  verificationCode: number
  phone: string
  id: number
  verificationCodeTimeSent: string
}

@ObjectType()
@Entity()
export class UserWithToken {
  @Field()
  token: string
}
