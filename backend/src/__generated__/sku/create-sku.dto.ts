/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<qhdkvRQMbiCAVcPriB51TH6DoLdkkhgb>>
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
export class CreateSkuDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Offer"}
  @Field({
    name: 'offer_id',
    description: 'ID of the Offer',
  })
  @IsInt()
  readonly offerId?: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"string","description":"ID of the SKU on the External Ecom Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the SKU on the External Ecom Platform',
  })
  @IsString()
  readonly externalId?: string

  // Gen from: {"type":"string","description":"Sku Name"}
  @Field({
    name: 'name',
    description: 'Sku Name',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"string","description":"Amazon Standard Identification Number"}
  @Field({
    name: 'asin',
    description: 'Amazon Standard Identification Number',
  })
  @IsString()
  readonly asin?: string

  // Gen from: {"type":"string","description":"Global Trade Item Number"}
  @Field({
    name: 'gtin',
    description: 'Global Trade Item Number',
  })
  @IsString()
  readonly gtin?: string

  // Gen from: {"type":"string","description":"Universal Product Code"}
  @Field({
    name: 'upc',
    description: 'Universal Product Code',
  })
  @IsString()
  readonly upc?: string

  // Gen from: {"type":"string","description":"European Article Number"}
  @Field({
    name: 'ean',
    description: 'European Article Number',
  })
  @IsString()
  readonly ean?: string

  // Gen from: {"type":"string","description":"International Standard Book Number"}
  @Field({
    name: 'isbn',
    description: 'International Standard Book Number',
  })
  @IsString()
  readonly isbn?: string

  // Gen from: {"type":"boolean","description":"Is the Product in Stock","default":false}
  @Field({
    name: 'in_stock',
    description: 'Is the Product in Stock',
  })
  readonly inStock?: boolean

  // Gen from: {"type":"integer","format":"int32","description":"Quantity Available"}
  @Field({
    name: 'quantity_available',
    description: 'Quantity Available',
  })
  @IsInt()
  readonly quantityAvailable?: number

  // Gen from: {"type":"boolean","description":"Is the SKUs inventory tracked","default":false}
  @Field({
    name: 'inventory_tracked',
    description: 'Is the SKUs inventory tracked',
  })
  readonly inventoryTracked?: boolean

  // Gen from: {"type":"integer","format":"int32","description":"Sale Price of the SKU"}
  @Field({
    name: 'sale_price',
    description: 'Sale Price of the SKU',
  })
  @IsInt()
  readonly salePrice?: number

  // Gen from: {"type":"integer","format":"int32","description":"Retail Price of the SKU"}
  @Field({
    name: 'retail_price',
    description: 'Retail Price of the SKU',
  })
  @IsInt()
  readonly retailPrice?: number

  // Gen from: {"type":"string","description":"The starting currency of this SKU"}
  @Field({
    name: 'currency',
    description: 'The starting currency of this SKU',
  })
  @IsString()
  readonly currency?: string

  // Gen from: {"type":"boolean","description":"Is the product taxable","default":false}
  @Field({
    name: 'taxable',
    description: 'Is the product taxable',
  })
  readonly taxable?: boolean

  // Gen from: {"type":"string","description":"Type of Tax on this SKU","enum":["default","apparel","service"]}
  @Field({
    name: 'tax_type',
    description: 'Type of Tax on this SKU',
  })
  @IsString()
  readonly taxType?: string

  // Gen from: {"type":"array","description":"Sku Albums","unique_items":true,"items":{"$ref":"#/definitions/Album"}}
  @Field({
    name: 'albums',
    description: 'Sku Albums',
  })
  readonly albums?: string

  // Gen from: {"type":"array","description":"Variant Values that apply to this SKU","unique_items":true,"items":{"$ref":"#/definitions/SkuVariantValue"}}
  @Field({
    name: 'variant_values',
    description: 'Variant Values that apply to this SKU',
  })
  readonly variantValues?: string

  // Gen from: {"type":"string","enum":["physical","digital","virtual"]}
  @Field({
    name: 'type',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"string","description":"SKU Status","enum":["enabled","disabled"]}
  @Field({
    name: 'status',
    description: 'SKU Status',
  })
  @IsString()
  readonly status?: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of SKU creation"}
  @Field({
    name: 'date_created',
    description: 'Date of SKU creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last SKU update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last SKU update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date

  // Gen from: {"description":"Dimensions of the SKU","$ref":"#/definitions/Sku Dimensions"}
  @Field({
    name: 'sku_dimensions',
    description: 'Dimensions of the SKU',
  })
  readonly skuDimensions?: string
}
