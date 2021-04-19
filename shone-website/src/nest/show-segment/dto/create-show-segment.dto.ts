import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreateShowSegmentDto {
  @Field()
  @IsString()
  readonly showId: string

  @Field()
  @IsString()
  readonly brand_id: string
}
