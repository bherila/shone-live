import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsString } from 'class-validator'

@InputType()
export class ShowSegmentDto {
  @Field()
  @IsString()
  readonly title: string

  @Field(() => [String])
  @IsArray()
  readonly productsIds: string[]
}
