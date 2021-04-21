/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<jFzAnLmyOS07USPIdXPUB5fWCUY6toeF>>
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
@Entity({ name: 'bag' })
export class Bag {
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

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Order the Bag belongs to"}
  @Field({
    name: 'order_id',
    description: 'ID of the Order the Bag belongs to',
  })
  @Column({
    name: 'order_id',
    type: 'bigint',
  })
  orderId: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant the Bag references"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant the Bag references',
  })
  @Column({
    name: 'merchant_id',
    type: 'bigint',
  })
  merchantId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the App creating this Bag"}
  @Field({
    name: 'app_id',
    description: 'ID of the App creating this Bag',
  })
  @Column({
    name: 'app_id',
    type: 'bigint',
  })
  appId: number

  // Gen from: {"type":"string","description":"ID of the Order on the External Ecommerce Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the Order on the External Ecommerce Platform',
  })
  @Column({
    name: 'external_id',
    type: 'text',
  })
  externalId: string

  // Gen from: {"type":"string","description":"Status","enum":["in_progress","submitted","accepted","shipped","completed","rejected","canceled"]}
  @Field({
    name: 'status',
    description: 'Status',
  })
  @Column({
    name: 'status',
    type: 'text',
  })
  status: string

  // Gen from: {"type":"string","description":"Fulfillment Status","enum":["unshipped","shipped","partially_shipped","returned"]}
  @Field({
    name: 'fulfillment_status',
    description: 'Fulfillment Status',
  })
  @Column({
    name: 'fulfillment_status',
    type: 'text',
  })
  fulfillmentStatus: string

  // Gen from: {"type":"string","description":"Financial Status","enum":["unpaid","authorized","pending","paid","partially_paid","refunded","partially_refunded","voided"]}
  @Field({
    name: 'financial_status',
    description: 'Financial Status',
  })
  @Column({
    name: 'financial_status',
    type: 'text',
  })
  financialStatus: string

  // Gen from: {"type":"array","description":"SKUs added to the bag","items":{"$ref":"#/definitions/OrderSku"}}
  @Field({
    name: 'skus',
    description: 'SKUs added to the bag',
  })
  @Column({
    name: 'skus',
  })
  skus: string

  // Gen from: {"description":"Shipping Method of the Bag","$ref":"#/definitions/OrderShippingMethod"}
  @Field({
    name: 'shipping_method',
    description: 'Shipping Method of the Bag',
  })
  @JoinColumn({
    name: 'shipping_method_id',
  })
  shippingMethod: string

  // Gen from: {"type":"array","description":"Taxes applied to the bag","items":{"$ref":"#/definitions/OrderTax"}}
  @Field({
    name: 'taxes',
    description: 'Taxes applied to the bag',
  })
  @Column({
    name: 'taxes',
  })
  taxes: string

  // Gen from: {"type":"integer","format":"int32","description":"Subtotal of the bag"}
  @Field({
    name: 'sub_total',
    description: 'Subtotal of the bag',
  })
  @Column({
    name: 'sub_total',
    type: 'bigint',
  })
  subTotal: number

  // Gen from: {"type":"integer","format":"int32","description":"Shipping Total of the bag"}
  @Field({
    name: 'shipping_total',
    description: 'Shipping Total of the bag',
  })
  @Column({
    name: 'shipping_total',
    type: 'bigint',
  })
  shippingTotal: number

  // Gen from: {"type":"integer","format":"int32","description":"Tax Total of the bag"}
  @Field({
    name: 'tax_total',
    description: 'Tax Total of the bag',
  })
  @Column({
    name: 'tax_total',
    type: 'bigint',
  })
  taxTotal: number

  // Gen from: {"type":"integer","format":"int32","description":"Total price of the bag"}
  @Field({
    name: 'total',
    description: 'Total price of the bag',
  })
  @Column({
    name: 'total',
    type: 'bigint',
  })
  total: number

  // Gen from: {"type":"array","description":"Transactions of the bag","items":{"$ref":"#/definitions/Transaction"}}
  @Field({
    name: 'transactions',
    description: 'Transactions of the bag',
  })
  @Column({
    name: 'transactions',
  })
  transactions: string

  // Gen from: {"type":"boolean","description":"If bag is tracked externally","default":false}
  @Field({
    name: 'external_checkout',
    description: 'If bag is tracked externally',
  })
  @Column({
    name: 'external_checkout',
  })
  externalCheckout: boolean

  // Gen from: {"type":"string","description":"Name of Merchant"}
  @Field({
    name: 'merchant_name',
    description: 'Name of Merchant',
  })
  @Column({
    name: 'merchant_name',
    type: 'text',
  })
  merchantName: string
}
