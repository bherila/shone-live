import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateProductDto {
  @Field()
  @IsString()
  readonly user_id: string

  @Field()
  @IsNumber()
  readonly show_id: number

  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly description: string
}
