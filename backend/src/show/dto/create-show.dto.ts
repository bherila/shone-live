import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsString } from 'class-validator'

@InputType()
export class CreateShowDto {
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
}
