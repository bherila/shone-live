import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Index({
    unique: true
  })
  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string

  @Index({
    unique: true
  })
  @Field()
  @Column()
  phone: string

  @Index({
    unique: true
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
