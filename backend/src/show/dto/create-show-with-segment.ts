import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsObject, IsString } from 'class-validator'

import { ShowSegmentDto } from '../../show-segment/dto/show-segment.dto'

@InputType()
export class CreateShowWithSegmentDto {
  @Field()
  @IsString()
  readonly brandId: string

  @Field()
  @IsString()
  readonly title: string

  @Field()
  @IsString()
  readonly imageUrl: string

  @Field()
  @IsDate()
  readonly startDate: Date

  @Field()
  @IsDate()
  readonly endDate: Date

  @Field(() => ShowSegmentDto)
  @IsObject()
  readonly showSegment: ShowSegmentDto
}
