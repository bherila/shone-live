/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<5/547xKEMhcGyOsT9/ynhZKgkComcsEJ>>
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
@Entity({ name: 'order_shipping_method' })
export class OrderShippingMethod {
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

  // Gen from: {"type":"string","description":"Type of Shipping Method","enum":["variable","flat_rate"]}
  @Field({
    name: 'type',
    description: 'Type of Shipping Method',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"string","enum":["ups","usps","fedex","dhl","ontrac"]}
  @Field({
    name: 'carrier',
  })
  @Column({
    name: 'carrier',
    type: 'text',
  })
  carrier: string

  // Gen from: {"type":"string","description":"Shipping Method Label"}
  @Field({
    name: 'label',
    description: 'Shipping Method Label',
  })
  @Column({
    name: 'label',
    type: 'text',
  })
  label: string

  // Gen from: {"type":"integer","format":"int32","description":"Total cost of the Shipping Method"}
  @Field({
    name: 'price',
    description: 'Total cost of the Shipping Method',
  })
  @Column({
    name: 'price',
    type: 'bigint',
  })
  price: number

  // Gen from: {"type":"integer","format":"int32","description":"Minimum Subtotal"}
  @Field({
    name: 'min_subtotal',
    description: 'Minimum Subtotal',
  })
  @Column({
    name: 'min_subtotal',
    type: 'bigint',
  })
  minSubtotal: number

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'max_subtotal',
  })
  @Column({
    name: 'max_subtotal',
    type: 'bigint',
  })
  maxSubtotal: number

  // Gen from: {"type":"number","format":"double","description":"Minimum Weight"}
  @Field({
    name: 'min_weight',
    description: 'Minimum Weight',
  })
  @Column({
    name: 'min_weight',
  })
  minWeight: number

  // Gen from: {"type":"number","format":"double","description":"Maximum Weight"}
  @Field({
    name: 'max_weight',
    description: 'Maximum Weight',
  })
  @Column({
    name: 'max_weight',
  })
  maxWeight: number

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'bigint',
  })
  id: number

  // Gen from: {"type":"string","description":"ID of the referenced Shipping Method"}
  @Field({
    name: 'shipping_method_id',
    description: 'ID of the referenced Shipping Method',
  })
  @Column({
    name: 'shipping_method_id',
    type: 'text',
  })
  shippingMethodId: string

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Bag the Shipping Method applies to"}
  @Field({
    name: 'bag_id',
    description: 'ID of the Bag the Shipping Method applies to',
  })
  @Column({
    name: 'bag_id',
    type: 'bigint',
  })
  bagId: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the merchant the bag belongs to"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the merchant the bag belongs to',
  })
  @Column({
    name: 'merchant_id',
    type: 'bigint',
  })
  merchantId: number

  // Gen from: {"type":"string","description":"Carrier Tracking Number"}
  @Field({
    name: 'tracking_number',
    description: 'Carrier Tracking Number',
  })
  @Column({
    name: 'tracking_number',
    type: 'text',
  })
  trackingNumber: string
}
