import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class AddPaymentMethodDto {
  @Field()
  @IsString()
  addressId: string

  @Field()
  @IsString()
  cvc: string

  @Field()
  @IsString()
  cardNumber: string

  @Field()
  @IsString()
  expiryDate: string

  @Field()
  @IsOptional()
  @IsString()
  cardName: string
}
