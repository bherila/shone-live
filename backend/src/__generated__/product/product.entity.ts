/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<EkIDFbjQzJ33rxQ4IFoP+8xMUn+oU0lZ>>
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
@Entity({ name: 'product' })
export class Product {
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

  // Gen from: {"type":"string","read_only":true}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'text',
  })
  id: string

  // Gen from: {"type":"string","description":"Product Name"}
  @Field({
    name: 'name',
    description: 'Product Name',
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

  // Gen from: {"type":"string","description":"Product Long Description"}
  @Field({
    name: 'long_description',
    description: 'Product Long Description',
  })
  @Column({
    name: 'long_description',
    type: 'text',
  })
  longDescription: string

  // Gen from: {"type":"string","description":"Product Slug/Handle"}
  @Field({
    name: 'slug',
    description: 'Product Slug/Handle',
  })
  @Column({
    name: 'slug',
    type: 'text',
  })
  slug: string

  // Gen from: {"type":"string","description":"Brand"}
  @Field({
    name: 'brand',
    description: 'Brand',
  })
  @Column({
    name: 'brand',
    type: 'text',
  })
  brand: string

  // Gen from: {"type":"boolean","description":"Is the Product Available","default":false}
  @Field({
    name: 'available',
    description: 'Is the Product Available',
  })
  @Column({
    name: 'available',
  })
  available: boolean

  // Gen from: {"type":"boolean","description":"Is the Product Visible","default":false}
  @Field({
    name: 'visible',
    description: 'Is the Product Visible',
  })
  @Column({
    name: 'visible',
  })
  visible: boolean

  // Gen from: {"type":"string","description":"Product Type","enum":["physical","digital","virtual"]}
  @Field({
    name: 'type',
    description: 'Product Type',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"string","enum":["USD","GBP"]}
  @Field({
    name: 'currency',
  })
  @Column({
    name: 'currency',
    type: 'text',
  })
  currency: string

  // Gen from: {"type":"integer","format":"int32","description":"Minimum Price of the Product"}
  @Field({
    name: 'min_price',
    description: 'Minimum Price of the Product',
  })
  @Column({
    name: 'min_price',
    type: 'bigint',
  })
  minPrice: number

  // Gen from: {"type":"integer","format":"int32","description":"Maximum Price of the Product"}
  @Field({
    name: 'max_price',
    description: 'Maximum Price of the Product',
  })
  @Column({
    name: 'max_price',
    type: 'bigint',
  })
  maxPrice: number

  // Gen from: {"type":"array","description":"Product Variants","unique_items":true,"items":{"$ref":"#/definitions/ProductVariant"}}
  @Field({
    name: 'variants',
    description: 'Product Variants',
  })
  @Column({
    name: 'variants',
  })
  variants: string

  // Gen from: {"type":"array","description":"Merchant Offerings","unique_items":true,"items":{"$ref":"#/definitions/Offer"}}
  @Field({
    name: 'offers',
    description: 'Merchant Offerings',
  })
  @Column({
    name: 'offers',
  })
  offers: string

  // Gen from: {"type":"array","description":"Categories","unique_items":true,"items":{"$ref":"#/definitions/Category"}}
  @Field({
    name: 'categories',
    description: 'Categories',
  })
  @Column({
    name: 'categories',
  })
  categories: string

  // Gen from: {"type":"string","description":"Gender","enum":["MALE","FEMALE","UNISEX"]}
  @Field({
    name: 'gender',
    description: 'Gender',
  })
  @Column({
    name: 'gender',
    type: 'text',
  })
  gender: string

  // Gen from: {"type":"array","description":"Meta Data","unique_items":true,"items":{"$ref":"#/definitions/Meta"}}
  @Field({
    name: 'meta',
    description: 'Meta Data',
  })
  @Column({
    name: 'meta',
  })
  meta: string

  // Gen from: {"type":"array","description":"Tags","unique_items":true,"items":{"type":"string"}}
  @Field({
    name: 'tags',
    description: 'Tags',
  })
  @Column({
    name: 'tags',
  })
  tags: string

  // Gen from: {"type":"array","description":"ID's of related products.","unique_items":true,"items":{"type":"string"}}
  @Field({
    name: 'related_product_ids',
    description: "ID's of related products.",
  })
  @Column({
    name: 'related_product_ids',
  })
  relatedProductIds: string

  // Gen from: {"type":"array","description":"ID's of Cross Saleable Products.","unique_items":true,"items":{"type":"string"}}
  @Field({
    name: 'cross_sale_product_ids',
    description: "ID's of Cross Saleable Products.",
  })
  @Column({
    name: 'cross_sale_product_ids',
  })
  crossSaleProductIds: string

  // Gen from: {"type":"array","description":"List of Global Trade Item Numbers","unique_items":true,"items":{"type":"string"}}
  @Field({
    name: 'gtins',
    description: 'List of Global Trade Item Numbers',
  })
  @Column({
    name: 'gtins',
  })
  gtins: string

  // Gen from: {"type":"string","description":"The default/cover image of the Product"}
  @Field({
    name: 'default_image_url',
    description: 'The default/cover image of the Product',
  })
  @Column({
    name: 'default_image_url',
    type: 'text',
  })
  defaultImageUrl: string

  // Gen from: {"type":"integer","format":"int32","description":"Overall Quantity"}
  @Field({
    name: 'qty_available',
    description: 'Overall Quantity',
  })
  @Column({
    name: 'qty_available',
    type: 'bigint',
  })
  qtyAvailable: number

  // Gen from: {"type":"number","format":"double","description":"The maximum commission rate offered by a merchant."}
  @Field({
    name: 'max_commission_rate',
    description: 'The maximum commission rate offered by a merchant.',
  })
  @Column({
    name: 'max_commission_rate',
  })
  maxCommissionRate: number

  // Gen from: {"type":"string","format":"date-time","description":"Date of product creation"}
  @Field({
    name: 'date_created',
    description: 'Date of product creation',
  })
  @Column({
    name: 'date_created',
    type: 'text',
  })
  dateCreated: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last product update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last product update',
  })
  @Column({
    name: 'date_last_modified',
    type: 'text',
  })
  dateLastModified: Date
}
