import { Field, InputType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class CreateShowYourStyleVoteDto {
  @Field()
  @IsNumber()
  readonly user_id: number

  @Field()
  @IsNumber()
  readonly entry_id: number

  @Field()
  @IsNumber()
  readonly vote: number

  @Field()
  @IsNumber()
  readonly view_duration: number
}
