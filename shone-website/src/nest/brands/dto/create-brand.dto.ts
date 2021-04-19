import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateBrandDto {
  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly description: string
}
