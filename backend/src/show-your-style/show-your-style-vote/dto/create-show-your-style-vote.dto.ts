import { Field, InputType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class CreateShowYourStyleVoteDto {
  @Field()
  @IsNumber()
  readonly userId: number

  @Field()
  @IsNumber()
  readonly entryId: number

  @Field()
  @IsNumber()
  readonly vote: number

  @Field()
  @IsNumber()
  readonly viewDuration: number
}
