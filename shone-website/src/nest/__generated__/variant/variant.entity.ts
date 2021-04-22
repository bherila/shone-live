/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<dUjDhZkFZ1F/2lWzozP1z515zEy58o4s>>
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
@Entity({ name: 'variant' })
export class Variant {
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

  // Gen from: {"type":"string","description":"ID of the Product Variant"}
  @Field({
    name: 'product_variant_id',
    description: 'ID of the Product Variant',
  })
  @Column({
    name: 'product_variant_id',
    type: 'text',
  })
  productVariantId: string

  // Gen from: {"type":"string","description":"ID of the Variant on the External Ecommerce Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the Variant on the External Ecommerce Platform',
  })
  @Column({
    name: 'external_id',
    type: 'text',
  })
  externalId: string

  // Gen from: {"type":"string","description":"Variant Name"}
  @Field({
    name: 'name',
    description: 'Variant Name',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"boolean","description":"Is the variant visual","default":false}
  @Field({
    name: 'visual',
    description: 'Is the variant visual',
  })
  @Column({
    name: 'visual',
  })
  visual: boolean

  // Gen from: {"type":"array","items":{"$ref":"#/definitions/VariantValue"}}
  @Field({
    name: 'values',
  })
  @Column({
    name: 'values',
  })
  values: string
}
