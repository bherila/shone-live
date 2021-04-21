import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

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
  @Field({ nullable: true })
  @Column({ nullable: true })
  username: string

  @Column({ nullable: true })
  verificationCode: string

  @Field({ name: 'verification_code_time_sent' })
  @Column({ nullable: true, name: 'verification_code_time_sent' })
  verificationCodeTimeSent: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  token: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  profileUrl: string
}