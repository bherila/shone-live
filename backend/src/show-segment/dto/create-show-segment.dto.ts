import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsString } from 'class-validator'

@InputType()
export class CreateShowSegmentDto {
  @Field()
  @IsString()
  readonly showId: string

  @Field()
  @IsString()
  readonly brandId: string

  @Field()
  @IsString()
  readonly title: string

  @Field(() => [String])
  @IsArray()
  readonly productsIds: string[]
}
