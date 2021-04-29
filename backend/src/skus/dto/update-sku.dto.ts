import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class UpdateSkuDto {
  @Field()
  @IsString()
  readonly id: string

  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly friendlyName: string

  @Field()
  @IsString()
  readonly COGS: string

  @Field()
  @IsNumber()
  readonly stock: number
}
