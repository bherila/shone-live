import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateSkuDto {
  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  readonly variantId: string

  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly COGS: string

  @Field()
  @IsString()
  readonly friendlyName: string

  @Field()
  @IsNumber()
  readonly stock: number
}
