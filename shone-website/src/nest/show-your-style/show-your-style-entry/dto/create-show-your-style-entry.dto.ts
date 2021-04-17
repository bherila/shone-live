import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateShowYourStyleEntryDto {
  @Field()
  @IsNumber()
  readonly userId: number

  @Field()
  @IsString()
  readonly videoUrl: string
}

export class CreateShowYourStyleVideoIdEntryDto {
  @Field()
  @IsNumber()
  readonly userId: number

  @Field()
  @IsString()
  readonly videoId: string
}
