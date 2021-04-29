import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsString } from 'class-validator'

@InputType()
export class UpdateShowSegmentDto {
  @Field()
  @IsString()
  readonly id: string

  @Field()
  @IsString()
  readonly title: string

  @Field(() => [String])
  @IsArray()
  readonly productsIds: string[]
}
