/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<PB5VbtHPafK1Ni3QuWv9M7E0RouJRLgL>>
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
export class CreateOrderSkuDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64"}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant the SKU belongs to"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant the SKU belongs to',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the App creating the Order"}
  @Field({
    name: 'app_id',
    description: 'ID of the App creating the Order',
  })
  @IsInt()
  readonly appId?: number

  // Gen from: {"type":"string","description":"ID of the Product"}
  @Field({
    name: 'product_id',
    description: 'ID of the Product',
  })
  @IsString()
  readonly productId?: string

  // Gen from: {"type":"integer","format":"int64","description":"ID of the referenced SKU"}
  @Field({
    name: 'sku_id',
    description: 'ID of the referenced SKU',
  })
  @IsInt()
  readonly skuId?: number

  // Gen from: {"type":"string","description":"ID of the SKU on the External Ecommerce Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the SKU on the External Ecommerce Platform',
  })
  @IsString()
  readonly externalId?: string

  // Gen from: {"type":"string","description":"Name of the SKU","read_only":true}
  @Field({
    name: 'name',
    description: 'Name of the SKU',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"string","description":"URL of the thumbnail image","read_only":true}
  @Field({
    name: 'thumbnail',
    description: 'URL of the thumbnail image',
  })
  @IsString()
  readonly thumbnail?: string

  // Gen from: {"type":"integer","format":"int32","description":"Quantity of the SKU being purchased"}
  @Field({
    name: 'quantity',
    description: 'Quantity of the SKU being purchased',
  })
  @IsInt()
  readonly quantity?: number

  // Gen from: {"type":"integer","format":"int32","description":"SKU Price","read_only":true}
  @Field({
    name: 'price',
    description: 'SKU Price',
  })
  @IsInt()
  readonly price?: number
}
