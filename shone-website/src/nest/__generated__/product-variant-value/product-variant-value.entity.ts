/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<</S4G41RrHvPqx0mym+/yNLXXgQXh6R0M>>
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
@Entity({ name: 'product_variant_value' })
export class ProductVariantValue {
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

  // Gen from: {"type":"string","read_only":true}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'text',
  })
  id: string

  // Gen from: {"type":"string","description":"ID of the Variation"}
  @Field({
    name: 'variant_id',
    description: 'ID of the Variation',
  })
  @Column({
    name: 'variant_id',
    type: 'text',
  })
  variantId: string

  // Gen from: {"type":"string","description":"Name"}
  @Field({
    name: 'name',
    description: 'Name',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

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

  // Gen from: {"type":"string","description":"Color/Pattern Swatch URL"}
  @Field({
    name: 'swatch',
    description: 'Color/Pattern Swatch URL',
  })
  @Column({
    name: 'swatch',
    type: 'text',
  })
  swatch: string

  // Gen from: {"type":"string","description":"Hex Code"}
  @Field({
    name: 'hex',
    description: 'Hex Code',
  })
  @Column({
    name: 'hex',
    type: 'text',
  })
  hex: string
}
