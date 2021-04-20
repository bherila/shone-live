/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<2qBh28+87YRbj8He10ofkkE1jOt4ZsO1>>
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
export class CreateOfferDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64"}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"string","description":"The parent/container product ID"}
  @Field({
    name: 'product_id',
    description: 'The parent/container product ID',
  })
  @IsString()
  readonly productId?: string

  // Gen from: {"type":"string","description":"External ID"}
  @Field({
    name: 'external_id',
    description: 'External ID',
  })
  @IsString()
  readonly externalId?: string

  // Gen from: {"type":"string","description":"External URL"}
  @Field({
    name: 'external_url',
    description: 'External URL',
  })
  @IsString()
  readonly externalUrl?: string

  // Gen from: {"type":"string","description":"Name of Product in Offer"}
  @Field({
    name: 'name',
    description: 'Name of Product in Offer',
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

  // Gen from: {"type":"string","description":"Source Platform","enum":["OTHER","SHOPIFY","MAGENTO","MAGENTO_ONE","WOOCOMMERCE","BIGCOMMERCE","LIGHTSPEED","ECWID","YAAS","SPREECOMMERCE","DEMANDWARE","VOLUSION"]}
  @Field({
    name: 'source',
    description: 'Source Platform',
  })
  @IsString()
  readonly source?: string

  // Gen from: {"type":"string","description":"Name of Merchant Selling Product"}
  @Field({
    name: 'seller',
    description: 'Name of Merchant Selling Product',
  })
  @IsString()
  readonly seller?: string

  // Gen from: {"type":"string","description":"Name of Original Vendor"}
  @Field({
    name: 'vendor',
    description: 'Name of Original Vendor',
  })
  @IsString()
  readonly vendor?: string

  // Gen from: {"type":"integer","format":"int32","description":"Merchant ID"}
  @Field({
    name: 'merchant_id',
    description: 'Merchant ID',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"boolean","description":"Is Product Available","default":false}
  @Field({
    name: 'available',
    description: 'Is Product Available',
  })
  readonly available?: boolean

  // Gen from: {"type":"boolean","description":"Is Product Visible","default":false}
  @Field({
    name: 'visible',
    description: 'Is Product Visible',
  })
  readonly visible?: boolean

  // Gen from: {"type":"integer","format":"int32","description":"Minimum Price the Product sells for"}
  @Field({
    name: 'min_price',
    description: 'Minimum Price the Product sells for',
  })
  @IsInt()
  readonly minPrice?: number

  // Gen from: {"type":"integer","format":"int32","description":"Maximum Price the Product sells for"}
  @Field({
    name: 'max_price',
    description: 'Maximum Price the Product sells for',
  })
  @IsInt()
  readonly maxPrice?: number

  // Gen from: {"type":"number","format":"double","description":"Amount given by merchant"}
  @Field({
    name: 'commission_rate',
    description: 'Amount given by merchant',
  })
  readonly commissionRate?: number

  // Gen from: {"type":"boolean","description":"If the commission rate is unique to this offer.","default":false}
  @Field({
    name: 'special_commission_rate',
    description: 'If the commission rate is unique to this offer.',
  })
  readonly specialCommissionRate?: boolean

  // Gen from: {"type":"string","description":"Default Currency of Offer"}
  @Field({
    name: 'currency',
    description: 'Default Currency of Offer',
  })
  @IsString()
  readonly currency?: string

  // Gen from: {"type":"string","description":"Original Category on Source Platform"}
  @Field({
    name: 'source_category_name',
    description: 'Original Category on Source Platform',
  })
  @IsString()
  readonly sourceCategoryName?: string

  // Gen from: {"type":"array","description":"Additional Meta Data of the Offer","unique_items":true,"items":{"$ref":"#/definitions/Meta"}}
  @Field({
    name: 'meta',
    description: 'Additional Meta Data of the Offer',
  })
  readonly meta?: string

  // Gen from: {"type":"array","description":"Product Variations","unique_items":true,"items":{"$ref":"#/definitions/Variant"}}
  @Field({
    name: 'variants',
    description: 'Product Variations',
  })
  readonly variants?: string

  // Gen from: {"type":"array","description":"Product SKUs","unique_items":true,"items":{"$ref":"#/definitions/Sku"}}
  @Field({
    name: 'skus',
    description: 'Product SKUs',
  })
  readonly skus?: string

  // Gen from: {"type":"array","description":"Product Albums","unique_items":true,"items":{"$ref":"#/definitions/Album"}}
  @Field({
    name: 'albums',
    description: 'Product Albums',
  })
  readonly albums?: string

  // Gen from: {"type":"boolean","description":"Is the product 3D Enabled","default":false}
  @Field({
    name: 'three_d_enables',
    description: 'Is the product 3D Enabled',
  })
  readonly threeDEnables?: boolean

  // Gen from: {"type":"string","description":"3D Resource Object"}
  @Field({
    name: 'three_d_resource',
    description: '3D Resource Object',
  })
  @IsString()
  readonly threeDResource?: string

  // Gen from: {"type":"string","description":"Product Type","enum":["PHYSICAL","DIGITAL","VIRTUAL"]}
  @Field({
    name: 'type',
    description: 'Product Type',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"string","description":"Status","enum":["ENABLED","DISABLED"]}
  @Field({
    name: 'status',
    description: 'Status',
  })
  @IsString()
  readonly status?: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of offer creation"}
  @Field({
    name: 'date_created',
    description: 'Date of offer creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last offer update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last offer update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date

  // Gen from: {"type":"string","description":"Weight Unit","enum":["OUNCES","POUNDS","GRAMS","KILOGRAMS","CARATS","TONNES","MILLIGRAMS","LITERS","MILLILITERS","QUARTS","QUARTERS","GALLONS","PINTS"]}
  @Field({
    name: 'weight_unit',
    description: 'Weight Unit',
  })
  @IsString()
  readonly weightUnit?: string

  // Gen from: {"type":"string","description":"Size Unit","enum":["MILLIMETERS","CENTIMETERS","INCHES","FEET","METERS","YARDS"]}
  @Field({
    name: 'size_unit',
    description: 'Size Unit',
  })
  @IsString()
  readonly sizeUnit?: string
}
