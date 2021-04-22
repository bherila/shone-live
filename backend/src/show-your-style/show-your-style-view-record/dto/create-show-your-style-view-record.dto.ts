import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreateShowYourStyleViewRecordDto {
  @Field()
  @IsString()
  readonly userId: string

  @Field()
  @IsString()
  readonly entryId: string
}
