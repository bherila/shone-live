/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<yZnNEB6tikivDQGNWJ7W6XHdo1QzzamW>>
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
@Entity({ name: 'order_tax' })
export class OrderTax {
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

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Order the Tax belongs to"}
  @Field({
    name: 'order_id',
    description: 'ID of the Order the Tax belongs to',
  })
  @Column({
    name: 'order_id',
    type: 'bigint',
  })
  orderId: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant the Bag belongs to"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant the Bag belongs to',
  })
  @Column({
    name: 'merchant_id',
    type: 'bigint',
  })
  merchantId: number

  // Gen from: {"type":"array","description":"SKUs covered by the Tax","items":{"type":"string"}}
  @Field({
    name: 'skus',
    description: 'SKUs covered by the Tax',
  })
  @Column({
    name: 'skus',
  })
  skus: string

  // Gen from: {"type":"string","description":"State abbreviation"}
  @Field({
    name: 'state',
    description: 'State abbreviation',
  })
  @Column({
    name: 'state',
    type: 'text',
  })
  state: string

  // Gen from: {"type":"string","description":"Postal/Zip Code"}
  @Field({
    name: 'postal_code',
    description: 'Postal/Zip Code',
  })
  @Column({
    name: 'postal_code',
    type: 'text',
  })
  postalCode: string

  // Gen from: {"type":"number","format":"double","description":"Tax Rate"}
  @Field({
    name: 'rate',
    description: 'Tax Rate',
  })
  @Column({
    name: 'rate',
  })
  rate: number

  // Gen from: {"type":"integer","format":"int32","description":"Total Tax amount on Bag"}
  @Field({
    name: 'amount',
    description: 'Total Tax amount on Bag',
  })
  @Column({
    name: 'amount',
    type: 'bigint',
  })
  amount: number

  // Gen from: {"type":"string","description":"Description of the Tax","min_length":0,"max_length":255}
  @Field({
    name: 'description',
    description: 'Description of the Tax',
  })
  @Column({
    name: 'description',
    type: 'text',
  })
  description: string
}
