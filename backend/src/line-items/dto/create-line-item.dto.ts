import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreateLineItemsDto {
  @Field()
  @IsString()
  readonly orderId: string
  @Field()
  @IsString()
  readonly skuId: string

  @Field()
  @IsString()
  readonly amount: number
}
