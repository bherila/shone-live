/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<joFc8GEfpQXjjP9RzQ5rApXMICrGpjQz>>
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
@Entity({ name: 'variant_value' })
export class VariantValue {
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

  // Gen from: {"type":"string","description":"ID of the Product Variation Value"}
  @Field({
    name: 'product_variant_value_id',
    description: 'ID of the Product Variation Value',
  })
  @Column({
    name: 'product_variant_value_id',
    type: 'text',
  })
  productVariantValueId: string

  // Gen from: {"type":"string","description":"ID of the Variant in the External Ecommerce Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the Variant in the External Ecommerce Platform',
  })
  @Column({
    name: 'external_id',
    type: 'text',
  })
  externalId: string

  // Gen from: {"type":"string","description":"Variant Value Name"}
  @Field({
    name: 'name',
    description: 'Variant Value Name',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"array","description":"ID's of SKU's containing this Variant Value","unique_items":true,"items":{"type":"integer","format":"int64"}}
  @Field({
    name: 'sku_ids',
    description: "ID's of SKU's containing this Variant Value",
  })
  @Column({
    name: 'sku_ids',
  })
  skuIds: string
}
