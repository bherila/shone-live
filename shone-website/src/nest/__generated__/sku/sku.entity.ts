/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<GvszW9e6QFQf2NPTVRK8jMLUQlYnSo2A>>
 */

import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity({ name: 'sku' })
export class Sku {
  @Field({
    name: 'ent_id',
    description: 'Global unique ID for this entity (within SHONE)',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'ent_id' })
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

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'bigint',
  })
  id: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Offer"}
  @Field({
    name: 'offer_id',
    description: 'ID of the Offer',
  })
  @Column({
    name: 'offer_id',
    type: 'bigint',
  })
  offerId: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant',
  })
  @Column({
    name: 'merchant_id',
    type: 'bigint',
  })
  merchantId: number

  // Gen from: {"type":"string","description":"ID of the SKU on the External Ecom Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the SKU on the External Ecom Platform',
  })
  @Column({
    name: 'external_id',
    type: 'text',
  })
  externalId: string

  // Gen from: {"type":"string","description":"Sku Name"}
  @Field({
    name: 'name',
    description: 'Sku Name',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"string","description":"Amazon Standard Identification Number"}
  @Field({
    name: 'asin',
    description: 'Amazon Standard Identification Number',
  })
  @Column({
    name: 'asin',
    type: 'text',
  })
  asin: string

  // Gen from: {"type":"string","description":"Global Trade Item Number"}
  @Field({
    name: 'gtin',
    description: 'Global Trade Item Number',
  })
  @Column({
    name: 'gtin',
    type: 'text',
  })
  gtin: string

  // Gen from: {"type":"string","description":"Universal Product Code"}
  @Field({
    name: 'upc',
    description: 'Universal Product Code',
  })
  @Column({
    name: 'upc',
    type: 'text',
  })
  upc: string

  // Gen from: {"type":"string","description":"European Article Number"}
  @Field({
    name: 'ean',
    description: 'European Article Number',
  })
  @Column({
    name: 'ean',
    type: 'text',
  })
  ean: string

  // Gen from: {"type":"string","description":"International Standard Book Number"}
  @Field({
    name: 'isbn',
    description: 'International Standard Book Number',
  })
  @Column({
    name: 'isbn',
    type: 'text',
  })
  isbn: string

  // Gen from: {"type":"boolean","description":"Is the Product in Stock","default":false}
  @Field({
    name: 'in_stock',
    description: 'Is the Product in Stock',
  })
  @Column({
    name: 'in_stock',
  })
  inStock: boolean

  // Gen from: {"type":"integer","format":"int32","description":"Quantity Available"}
  @Field({
    name: 'quantity_available',
    description: 'Quantity Available',
  })
  @Column({
    name: 'quantity_available',
    type: 'bigint',
  })
  quantityAvailable: number

  // Gen from: {"type":"boolean","description":"Is the SKUs inventory tracked","default":false}
  @Field({
    name: 'inventory_tracked',
    description: 'Is the SKUs inventory tracked',
  })
  @Column({
    name: 'inventory_tracked',
  })
  inventoryTracked: boolean

  // Gen from: {"type":"integer","format":"int32","description":"Sale Price of the SKU"}
  @Field({
    name: 'sale_price',
    description: 'Sale Price of the SKU',
  })
  @Column({
    name: 'sale_price',
    type: 'bigint',
  })
  salePrice: number

  // Gen from: {"type":"integer","format":"int32","description":"Retail Price of the SKU"}
  @Field({
    name: 'retail_price',
    description: 'Retail Price of the SKU',
  })
  @Column({
    name: 'retail_price',
    type: 'bigint',
  })
  retailPrice: number

  // Gen from: {"type":"string","description":"The starting currency of this SKU"}
  @Field({
    name: 'currency',
    description: 'The starting currency of this SKU',
  })
  @Column({
    name: 'currency',
    type: 'text',
  })
  currency: string

  // Gen from: {"type":"boolean","description":"Is the product taxable","default":false}
  @Field({
    name: 'taxable',
    description: 'Is the product taxable',
  })
  @Column({
    name: 'taxable',
  })
  taxable: boolean

  // Gen from: {"type":"string","description":"Type of Tax on this SKU","enum":["default","apparel","service"]}
  @Field({
    name: 'tax_type',
    description: 'Type of Tax on this SKU',
  })
  @Column({
    name: 'tax_type',
    type: 'text',
  })
  taxType: string

  // Gen from: {"type":"array","description":"Sku Albums","unique_items":true,"items":{"$ref":"#/definitions/Album"}}
  @Field({
    name: 'albums',
    description: 'Sku Albums',
  })
  @Column({
    name: 'albums',
  })
  albums: string

  // Gen from: {"type":"array","description":"Variant Values that apply to this SKU","unique_items":true,"items":{"$ref":"#/definitions/SkuVariantValue"}}
  @Field({
    name: 'variant_values',
    description: 'Variant Values that apply to this SKU',
  })
  @Column({
    name: 'variant_values',
  })
  variantValues: string

  // Gen from: {"type":"string","enum":["physical","digital","virtual"]}
  @Field({
    name: 'type',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"string","description":"SKU Status","enum":["enabled","disabled"]}
  @Field({
    name: 'status',
    description: 'SKU Status',
  })
  @Column({
    name: 'status',
    type: 'text',
  })
  status: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of SKU creation"}
  @Field({
    name: 'date_created',
    description: 'Date of SKU creation',
  })
  @Column({
    name: 'date_created',
    type: 'text',
  })
  dateCreated: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last SKU update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last SKU update',
  })
  @Column({
    name: 'date_last_modified',
    type: 'text',
  })
  dateLastModified: Date

  // Gen from: {"description":"Dimensions of the SKU","$ref":"#/definitions/Sku Dimensions"}
  @Field({
    name: 'sku_dimensions',
    description: 'Dimensions of the SKU',
  })
  @JoinColumn({
    name: 'sku_dimensions_id',
  })
  skuDimensions: string
}
