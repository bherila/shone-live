import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Entity } from 'typeorm'

@ObjectType()
@Entity()
export class newUser {
  @Field()
  verificationCode!: number

  @Field()
  phone: string

  @Field(() => ID)
  readonly id: number

  @Field()
  verificationCodeTimeSent: string
}
