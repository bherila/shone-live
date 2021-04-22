/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<</7QLbKEBSk0reeDHOrHd0HMxVhCUVhL5>>
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
@Entity({ name: 'order_sku' })
export class OrderSku {
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

  // Gen from: {"type":"integer","format":"int64"}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'bigint',
  })
  id: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant the SKU belongs to"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant the SKU belongs to',
  })
  @Column({
    name: 'merchant_id',
    type: 'bigint',
  })
  merchantId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the App creating the Order"}
  @Field({
    name: 'app_id',
    description: 'ID of the App creating the Order',
  })
  @Column({
    name: 'app_id',
    type: 'bigint',
  })
  appId: number

  // Gen from: {"type":"string","description":"ID of the Product"}
  @Field({
    name: 'product_id',
    description: 'ID of the Product',
  })
  @Column({
    name: 'product_id',
    type: 'text',
  })
  productId: string

  // Gen from: {"type":"integer","format":"int64","description":"ID of the referenced SKU"}
  @Field({
    name: 'sku_id',
    description: 'ID of the referenced SKU',
  })
  @Column({
    name: 'sku_id',
    type: 'bigint',
  })
  skuId: number

  // Gen from: {"type":"string","description":"ID of the SKU on the External Ecommerce Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the SKU on the External Ecommerce Platform',
  })
  @Column({
    name: 'external_id',
    type: 'text',
  })
  externalId: string

  // Gen from: {"type":"string","description":"Name of the SKU","read_only":true}
  @Field({
    name: 'name',
    description: 'Name of the SKU',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"string","description":"URL of the thumbnail image","read_only":true}
  @Field({
    name: 'thumbnail',
    description: 'URL of the thumbnail image',
  })
  @Column({
    name: 'thumbnail',
    type: 'text',
  })
  thumbnail: string

  // Gen from: {"type":"integer","format":"int32","description":"Quantity of the SKU being purchased"}
  @Field({
    name: 'quantity',
    description: 'Quantity of the SKU being purchased',
  })
  @Column({
    name: 'quantity',
    type: 'bigint',
  })
  quantity: number

  // Gen from: {"type":"integer","format":"int32","description":"SKU Price","read_only":true}
  @Field({
    name: 'price',
    description: 'SKU Price',
  })
  @Column({
    name: 'price',
    type: 'bigint',
  })
  price: number
}
