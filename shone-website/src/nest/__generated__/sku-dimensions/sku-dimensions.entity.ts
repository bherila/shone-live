/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<CbsCm0wv6At6fn31L5Glpl4FOAdC1rWF>>
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
@Entity({ name: 'sku_dimensions' })
export class SkuDimensions {
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

  // Gen from: {"type":"integer","format":"int64","description":"ID of SKU Dimensions Belong To"}
  @Field({
    name: 'sku_id',
    description: 'ID of SKU Dimensions Belong To',
  })
  @Column({
    name: 'sku_id',
    type: 'bigint',
  })
  skuId: number

  // Gen from: {"type":"number","format":"double","description":"Weight of SKU"}
  @Field({
    name: 'weight',
    description: 'Weight of SKU',
  })
  @Column({
    name: 'weight',
  })
  weight: number

  // Gen from: {"type":"number","format":"double","description":"Height of SKU"}
  @Field({
    name: 'height',
    description: 'Height of SKU',
  })
  @Column({
    name: 'height',
  })
  height: number

  // Gen from: {"type":"number","format":"double","description":"Width of SKU"}
  @Field({
    name: 'width',
    description: 'Width of SKU',
  })
  @Column({
    name: 'width',
  })
  width: number

  // Gen from: {"type":"number","format":"double","description":"Length of SKU"}
  @Field({
    name: 'length',
    description: 'Length of SKU',
  })
  @Column({
    name: 'length',
  })
  length: number

  // Gen from: {"type":"string","description":"Dimensions Type","enum":["SKU","SHIPPING"]}
  @Field({
    name: 'type',
    description: 'Dimensions Type',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string
}
