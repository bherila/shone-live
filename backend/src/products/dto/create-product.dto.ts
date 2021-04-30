import { Field, InputType } from '@nestjs/graphql'
import { IsObject, IsOptional, IsString } from 'class-validator'

import { CreateVariantDto } from '../../variants/dto/create-variant.dto'

@InputType()
export class CreateProductDto {
  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  readonly showSegmentId: string

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  readonly brandId: string

  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly description: string

  @Field()
  @IsObject()
  readonly variantData: CreateVariantDto
}
