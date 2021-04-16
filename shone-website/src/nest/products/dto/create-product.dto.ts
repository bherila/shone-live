import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateProductDto {
  @Field()
  @IsNumber()
  readonly showId: number

  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly description: string
}
