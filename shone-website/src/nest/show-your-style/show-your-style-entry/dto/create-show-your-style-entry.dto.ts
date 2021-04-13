import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateShowYourStyleEntryDto {
  @Field()
  @IsNumber()
  readonly user_id: number

  @Field()
  @IsString()
  readonly video_url: string
}
