import { Field, InputType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class CreateShowYourStyleViewRecordDto {
  @Field()
  @IsNumber()
  readonly userId: number

  @Field()
  @IsNumber()
  readonly entryId: number
}
