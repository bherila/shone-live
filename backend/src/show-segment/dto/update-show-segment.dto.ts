import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateShowSegmentDto {
  @Field()
  @IsString()
  readonly id: string

  @Field()
  @IsString()
  readonly title: string
}
