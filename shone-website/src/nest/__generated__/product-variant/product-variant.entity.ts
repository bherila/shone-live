/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<XMyQgU4iZMSf6Jc5bjSAwyulMc3s2SI1>>
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
@Entity({ name: 'product_variant' })
export class ProductVariant {
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

  // Gen from: {"type":"string","description":"Product ID"}
  @Field({
    name: 'product_id',
    description: 'Product ID',
  })
  @Column({
    name: 'product_id',
    type: 'text',
  })
  productId: string

  // Gen from: {"type":"string"}
  @Field({
    name: 'name',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"boolean","description":"Is this a visual variant","default":false}
  @Field({
    name: 'visual',
    description: 'Is this a visual variant',
  })
  @Column({
    name: 'visual',
  })
  visual: boolean

  // Gen from: {"type":"array","description":"Product Variant values","unique_items":true,"items":{"$ref":"#/definitions/ProductVariantValue"}}
  @Field({
    name: 'values',
    description: 'Product Variant values',
  })
  @Column({
    name: 'values',
  })
  values: string

  // Gen from: {"type":"integer","format":"int32","description":"Display Order"}
  @Field({
    name: 'display_order',
    description: 'Display Order',
  })
  @Column({
    name: 'display_order',
    type: 'bigint',
  })
  displayOrder: number
}
