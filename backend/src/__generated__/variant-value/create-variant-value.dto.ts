/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<39xtxig8fo6ITR2O/w9XOq9l8r/apFOf>>
 */

import { Field, InputType } from '@nestjs/graphql'
import {
  IsEmail,
  IsString,
  IsInt,
  IsDate,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator'

@InputType()
export class CreateVariantValueDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"ID of the Product Variation Value"}
  @Field({
    name: 'product_variant_value_id',
    description: 'ID of the Product Variation Value',
  })
  @IsString()
  readonly productVariantValueId?: string

  // Gen from: {"type":"string","description":"ID of the Variant in the External Ecommerce Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the Variant in the External Ecommerce Platform',
  })
  @IsString()
  readonly externalId?: string

  // Gen from: {"type":"string","description":"Variant Value Name"}
  @Field({
    name: 'name',
    description: 'Variant Value Name',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"array","description":"ID's of SKU's containing this Variant Value","unique_items":true,"items":{"type":"integer","format":"int64"}}
  @Field({
    name: 'sku_ids',
    description: "ID's of SKU's containing this Variant Value",
  })
  readonly skuIds?: string
}
