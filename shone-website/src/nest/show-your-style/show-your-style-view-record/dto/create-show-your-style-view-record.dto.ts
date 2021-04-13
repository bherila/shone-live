import { Field, InputType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class CreateShowYourStyleViewRecordDto {
  @Field()
  @IsNumber()
  readonly user_id: number

  @Field()
  @IsNumber()
  readonly entry_id: number
}
