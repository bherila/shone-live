/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<7DmXwaKajaX8NzizfDEI1WgEi1MYUJjT>>
 */

import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity({ name: 'offer' })
export class Offer {
  @Field({
    name: 'ent_id',
    description: 'Global unique ID for this entity (within SHONE)',
  })
  @PrimaryGeneratedColumn('uuid')
  readonly entId: string

  @Field({ name: 'ent_created', description: 'Date this entity was created' })
  @CreateDateColumn({
    name: 'ent_created',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  readonly entCreated: Date

  @Field({ name: 'ent_updated', description: 'Date this entity was updated' })
  @UpdateDateColumn({
    name: 'ent_updated',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  readonly entUpdated: Date

  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64"}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'bigint',
  })
  id: number

  // Gen from: {"type":"string","description":"The parent/container product ID"}
  @Field({
    name: 'product_id',
    description: 'The parent/container product ID',
  })
  @Column({
    name: 'product_id',
    type: 'text',
  })
  productId: string

  // Gen from: {"type":"string","description":"External ID"}
  @Field({
    name: 'external_id',
    description: 'External ID',
  })
  @Column({
    name: 'external_id',
    type: 'text',
  })
  externalId: string

  // Gen from: {"type":"string","description":"External URL"}
  @Field({
    name: 'external_url',
    description: 'External URL',
  })
  @Column({
    name: 'external_url',
    type: 'text',
  })
  externalUrl: string

  // Gen from: {"type":"string","description":"Name of Product in Offer"}
  @Field({
    name: 'name',
    description: 'Name of Product in Offer',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"string","description":"Product Description"}
  @Field({
    name: 'description',
    description: 'Product Description',
  })
  @Column({
    name: 'description',
    type: 'text',
  })
  description: string

  // Gen from: {"type":"string","description":"Source Platform","enum":["OTHER","SHOPIFY","MAGENTO","MAGENTO_ONE","WOOCOMMERCE","BIGCOMMERCE","LIGHTSPEED","ECWID","YAAS","SPREECOMMERCE","DEMANDWARE","VOLUSION"]}
  @Field({
    name: 'source',
    description: 'Source Platform',
  })
  @Column({
    name: 'source',
    type: 'text',
  })
  source: string

  // Gen from: {"type":"string","description":"Name of Merchant Selling Product"}
  @Field({
    name: 'seller',
    description: 'Name of Merchant Selling Product',
  })
  @Column({
    name: 'seller',
    type: 'text',
  })
  seller: string

  // Gen from: {"type":"string","description":"Name of Original Vendor"}
  @Field({
    name: 'vendor',
    description: 'Name of Original Vendor',
  })
  @Column({
    name: 'vendor',
    type: 'text',
  })
  vendor: string

  // Gen from: {"type":"integer","format":"int32","description":"Merchant ID"}
  @Field({
    name: 'merchant_id',
    description: 'Merchant ID',
  })
  @Column({
    name: 'merchant_id',
    type: 'bigint',
  })
  merchantId: number

  // Gen from: {"type":"boolean","description":"Is Product Available","default":false}
  @Field({
    name: 'available',
    description: 'Is Product Available',
  })
  @Column({
    name: 'available',
  })
  available: boolean

  // Gen from: {"type":"boolean","description":"Is Product Visible","default":false}
  @Field({
    name: 'visible',
    description: 'Is Product Visible',
  })
  @Column({
    name: 'visible',
  })
  visible: boolean

  // Gen from: {"type":"integer","format":"int32","description":"Minimum Price the Product sells for"}
  @Field({
    name: 'min_price',
    description: 'Minimum Price the Product sells for',
  })
  @Column({
    name: 'min_price',
    type: 'bigint',
  })
  minPrice: number

  // Gen from: {"type":"integer","format":"int32","description":"Maximum Price the Product sells for"}
  @Field({
    name: 'max_price',
    description: 'Maximum Price the Product sells for',
  })
  @Column({
    name: 'max_price',
    type: 'bigint',
  })
  maxPrice: number

  // Gen from: {"type":"number","format":"double","description":"Amount given by merchant"}
  @Field({
    name: 'commission_rate',
    description: 'Amount given by merchant',
  })
  @Column({
    name: 'commission_rate',
  })
  commissionRate: number

  // Gen from: {"type":"boolean","description":"If the commission rate is unique to this offer.","default":false}
  @Field({
    name: 'special_commission_rate',
    description: 'If the commission rate is unique to this offer.',
  })
  @Column({
    name: 'special_commission_rate',
  })
  specialCommissionRate: boolean

  // Gen from: {"type":"string","description":"Default Currency of Offer"}
  @Field({
    name: 'currency',
    description: 'Default Currency of Offer',
  })
  @Column({
    name: 'currency',
    type: 'text',
  })
  currency: string

  // Gen from: {"type":"string","description":"Original Category on Source Platform"}
  @Field({
    name: 'source_category_name',
    description: 'Original Category on Source Platform',
  })
  @Column({
    name: 'source_category_name',
    type: 'text',
  })
  sourceCategoryName: string

  // Gen from: {"type":"array","description":"Additional Meta Data of the Offer","unique_items":true,"items":{"$ref":"#/definitions/Meta"}}
  @Field({
    name: 'meta',
    description: 'Additional Meta Data of the Offer',
  })
  @Column({
    name: 'meta',
  })
  meta: string

  // Gen from: {"type":"array","description":"Product Variations","unique_items":true,"items":{"$ref":"#/definitions/Variant"}}
  @Field({
    name: 'variants',
    description: 'Product Variations',
  })
  @Column({
    name: 'variants',
  })
  variants: string

  // Gen from: {"type":"array","description":"Product SKUs","unique_items":true,"items":{"$ref":"#/definitions/Sku"}}
  @Field({
    name: 'skus',
    description: 'Product SKUs',
  })
  @Column({
    name: 'skus',
  })
  skus: string

  // Gen from: {"type":"array","description":"Product Albums","unique_items":true,"items":{"$ref":"#/definitions/Album"}}
  @Field({
    name: 'albums',
    description: 'Product Albums',
  })
  @Column({
    name: 'albums',
  })
  albums: string

  // Gen from: {"type":"boolean","description":"Is the product 3D Enabled","default":false}
  @Field({
    name: 'three_d_enables',
    description: 'Is the product 3D Enabled',
  })
  @Column({
    name: 'three_d_enables',
  })
  threeDEnables: boolean

  // Gen from: {"type":"string","description":"3D Resource Object"}
  @Field({
    name: 'three_d_resource',
    description: '3D Resource Object',
  })
  @Column({
    name: 'three_d_resource',
    type: 'text',
  })
  threeDResource: string

  // Gen from: {"type":"string","description":"Product Type","enum":["PHYSICAL","DIGITAL","VIRTUAL"]}
  @Field({
    name: 'type',
    description: 'Product Type',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"string","description":"Status","enum":["ENABLED","DISABLED"]}
  @Field({
    name: 'status',
    description: 'Status',
  })
  @Column({
    name: 'status',
    type: 'text',
  })
  status: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of offer creation"}
  @Field({
    name: 'date_created',
    description: 'Date of offer creation',
  })
  @Column({
    name: 'date_created',
    type: 'text',
  })
  dateCreated: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last offer update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last offer update',
  })
  @Column({
    name: 'date_last_modified',
    type: 'text',
  })
  dateLastModified: Date

  // Gen from: {"type":"string","description":"Weight Unit","enum":["OUNCES","POUNDS","GRAMS","KILOGRAMS","CARATS","TONNES","MILLIGRAMS","LITERS","MILLILITERS","QUARTS","QUARTERS","GALLONS","PINTS"]}
  @Field({
    name: 'weight_unit',
    description: 'Weight Unit',
  })
  @Column({
    name: 'weight_unit',
    type: 'text',
  })
  weightUnit: string

  // Gen from: {"type":"string","description":"Size Unit","enum":["MILLIMETERS","CENTIMETERS","INCHES","FEET","METERS","YARDS"]}
  @Field({
    name: 'size_unit',
    description: 'Size Unit',
  })
  @Column({
    name: 'size_unit',
    type: 'text',
  })
  sizeUnit: string
}
