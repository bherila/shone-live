import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateShowYourStyleVoteDto {
  @Field()
  @IsString()
  readonly userId: string

  @Field()
  @IsString()
  readonly entryId: string

  @Field()
  @IsNumber()
  readonly vote: number

  @Field()
  @IsNumber()
  readonly viewDuration: number
}
