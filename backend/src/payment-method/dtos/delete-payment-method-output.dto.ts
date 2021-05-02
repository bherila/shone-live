import { Field, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ObjectType()
export class DeletePaymentMethodOutputDto {
  @Field()
  @IsString()
  msg: string
}
