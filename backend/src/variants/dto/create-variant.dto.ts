import { Field, InputType } from '@nestjs/graphql'
import { IsObject, IsOptional, IsString } from 'class-validator'

import { CreateSkuDto } from '../../skus/dto/create-sku.dto'

@InputType()
export class CreateVariantDto {
  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  readonly productId: string

  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly description: string

  @Field()
  @IsObject()
  readonly skuData: CreateSkuDto
}
