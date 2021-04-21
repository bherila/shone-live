import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString } from 'class-validator'

@InputType()
export class CreateConsumerLeadDto {
  @Field()
  @IsString()
  @IsEmail()
  readonly email: string
}
