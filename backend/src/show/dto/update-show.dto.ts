import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateShowDto {
  @Field()
  @IsString()
  readonly id: string

  @Field()
  @IsString()
  readonly brandId: string

  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly description: string
}
