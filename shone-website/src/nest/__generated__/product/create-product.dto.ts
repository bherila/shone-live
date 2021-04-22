/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<E27yQKDRy9/bm03plneUQsBZMJ/tMkzv>>
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
export class CreateProductDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","read_only":true}
  @Field({
    name: 'id',
  })
  @IsString()
  readonly id?: string

  // Gen from: {"type":"string","description":"Product Name"}
  @Field({
    name: 'name',
    description: 'Product Name',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"string","description":"Product Description"}
  @Field({
    name: 'description',
    description: 'Product Description',
  })
  @IsString()
  readonly description?: string

  // Gen from: {"type":"string","description":"Product Long Description"}
  @Field({
    name: 'long_description',
    description: 'Product Long Description',
  })
  @IsString()
  readonly longDescription?: string

  // Gen from: {"type":"string","description":"Product Slug/Handle"}
  @Field({
    name: 'slug',
    description: 'Product Slug/Handle',
  })
  @IsString()
  readonly slug?: string

  // Gen from: {"type":"string","description":"Brand"}
  @Field({
    name: 'brand',
    description: 'Brand',
  })
  @IsString()
  readonly brand?: string

  // Gen from: {"type":"boolean","description":"Is the Product Available","default":false}
  @Field({
    name: 'available',
    description: 'Is the Product Available',
  })
  readonly available?: boolean

  // Gen from: {"type":"boolean","description":"Is the Product Visible","default":false}
  @Field({
    name: 'visible',
    description: 'Is the Product Visible',
  })
  readonly visible?: boolean

  // Gen from: {"type":"string","description":"Product Type","enum":["physical","digital","virtual"]}
  @Field({
    name: 'type',
    description: 'Product Type',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"string","enum":["USD","GBP"]}
  @Field({
    name: 'currency',
  })
  @IsString()
  readonly currency?: string

  // Gen from: {"type":"integer","format":"int32","description":"Minimum Price of the Product"}
  @Field({
    name: 'min_price',
    description: 'Minimum Price of the Product',
  })
  @IsInt()
  readonly minPrice?: number

  // Gen from: {"type":"integer","format":"int32","description":"Maximum Price of the Product"}
  @Field({
    name: 'max_price',
    description: 'Maximum Price of the Product',
  })
  @IsInt()
  readonly maxPrice?: number

  // Gen from: {"type":"array","description":"Product Variants","unique_items":true,"items":{"$ref":"#/definitions/ProductVariant"}}
  @Field({
    name: 'variants',
    description: 'Product Variants',
  })
  readonly variants?: string

  // Gen from: {"type":"array","description":"Merchant Offerings","unique_items":true,"items":{"$ref":"#/definitions/Offer"}}
  @Field({
    name: 'offers',
    description: 'Merchant Offerings',
  })
  readonly offers?: string

  // Gen from: {"type":"array","description":"Categories","unique_items":true,"items":{"$ref":"#/definitions/Category"}}
  @Field({
    name: 'categories',
    description: 'Categories',
  })
  readonly categories?: string

  // Gen from: {"type":"string","description":"Gender","enum":["MALE","FEMALE","UNISEX"]}
  @Field({
    name: 'gender',
    description: 'Gender',
  })
  @IsString()
  readonly gender?: string

  // Gen from: {"type":"array","description":"Meta Data","unique_items":true,"items":{"$ref":"#/definitions/Meta"}}
  @Field({
    name: 'meta',
    description: 'Meta Data',
  })
  readonly meta?: string

  // Gen from: {"type":"array","description":"Tags","unique_items":true,"items":{"type":"string"}}
  @Field({
    name: 'tags',
    description: 'Tags',
  })
  readonly tags?: string

  // Gen from: {"type":"array","description":"ID's of related products.","unique_items":true,"items":{"type":"string"}}
  @Field({
    name: 'related_product_ids',
    description: "ID's of related products.",
  })
  readonly relatedProductIds?: string

  // Gen from: {"type":"array","description":"ID's of Cross Saleable Products.","unique_items":true,"items":{"type":"string"}}
  @Field({
    name: 'cross_sale_product_ids',
    description: "ID's of Cross Saleable Products.",
  })
  readonly crossSaleProductIds?: string

  // Gen from: {"type":"array","description":"List of Global Trade Item Numbers","unique_items":true,"items":{"type":"string"}}
  @Field({
    name: 'gtins',
    description: 'List of Global Trade Item Numbers',
  })
  readonly gtins?: string

  // Gen from: {"type":"string","description":"The default/cover image of the Product"}
  @Field({
    name: 'default_image_url',
    description: 'The default/cover image of the Product',
  })
  @IsString()
  readonly defaultImageUrl?: string

  // Gen from: {"type":"integer","format":"int32","description":"Overall Quantity"}
  @Field({
    name: 'qty_available',
    description: 'Overall Quantity',
  })
  @IsInt()
  readonly qtyAvailable?: number

  // Gen from: {"type":"number","format":"double","description":"The maximum commission rate offered by a merchant."}
  @Field({
    name: 'max_commission_rate',
    description: 'The maximum commission rate offered by a merchant.',
  })
  readonly maxCommissionRate?: number

  // Gen from: {"type":"string","format":"date-time","description":"Date of product creation"}
  @Field({
    name: 'date_created',
    description: 'Date of product creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last product update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last product update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date
}
