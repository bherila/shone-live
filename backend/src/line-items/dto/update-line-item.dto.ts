import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateLineItemsDto {
  @Field()
  @IsString()
  readonly id: string

  @Field()
  @IsString()
  readonly amount: number
}
