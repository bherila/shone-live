import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({ nullable: true })
  @Column({ nullable: true })
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
