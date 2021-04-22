/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<5MFINKrz+rVqmxTZ2aisXch1ftdW+W8G>>
 */

import { Field, InputType } from '@nestjs/graphql'
import {
  IsDate,
  IsEmail,
  IsInt,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

@InputType()
export class CreateSearchRequestDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"Query"}
  @Field({
    name: 'query',
    description: 'Query',
  })
  @IsString()
  readonly query?: string

  // Gen from: {"type":"integer","format":"int32","description":"Merchant ID"}
  @Field({
    name: 'merchant_id',
    description: 'Merchant ID',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"string","description":"Category ID"}
  @Field({
    name: 'category_id',
    description: 'Category ID',
  })
  @IsString()
  readonly categoryId?: string

  // Gen from: {"type":"string","description":"Category Slug"}
  @Field({
    name: 'category_slug',
    description: 'Category Slug',
  })
  @IsString()
  readonly categorySlug?: string

  // Gen from: {"type":"number","format":"double","description":"Minimum Commission"}
  @Field({
    name: 'min_commission',
    description: 'Minimum Commission',
  })
  readonly minCommission?: number

  // Gen from: {"type":"number","format":"double","description":"Maximum Commission"}
  @Field({
    name: 'max_commission',
    description: 'Maximum Commission',
  })
  readonly maxCommission?: number

  // Gen from: {"type":"integer","format":"int32","description":"Minimum Price"}
  @Field({
    name: 'min_price',
    description: 'Minimum Price',
  })
  @IsInt()
  readonly minPrice?: number

  // Gen from: {"type":"integer","format":"int32","description":"Maximum Price"}
  @Field({
    name: 'max_price',
    description: 'Maximum Price',
  })
  @IsInt()
  readonly maxPrice?: number

  // Gen from: {"type":"boolean","description":"Include offers with products","default":false}
  @Field({
    name: 'include_offers',
    description: 'Include offers with products',
  })
  readonly includeOffers?: boolean
}
