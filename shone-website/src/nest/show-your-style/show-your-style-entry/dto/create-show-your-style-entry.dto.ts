import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreateShowYourStyleEntryDto {
  @Field()
  @IsString()
  readonly userId: string

  @Field()
  @IsString()
  readonly videoUrl: string
}

export class CreateShowYourStyleVideoIdEntryDto {
  @Field()
  @IsString()
  readonly userId: string

  @Field()
  @IsString()
  readonly videoId: string
}
