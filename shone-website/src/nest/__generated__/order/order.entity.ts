/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<XjRHW/Dai1fv0cV1BdS2KTMljzZ/+D5O>>
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
@Entity({ name: 'order' })
export class Order {
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

  // Gen from: {"type":"string","read_only":true}
  @Field({
    name: 'token',
  })
  @Column({
    name: 'token',
    type: 'text',
  })
  token: string

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Seller"}
  @Field({
    name: 'seller_id',
    description: 'ID of the Seller',
  })
  @Column({
    name: 'seller_id',
    type: 'bigint',
  })
  sellerId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the User placing the order"}
  @Field({
    name: 'user_id',
    description: 'ID of the User placing the order',
  })
  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the App creating the order"}
  @Field({
    name: 'app_id',
    description: 'ID of the App creating the order',
  })
  @Column({
    name: 'app_id',
    type: 'bigint',
  })
  appId: number

  // Gen from: {"description":"Customer placing the order","$ref":"#/definitions/OrderCustomer"}
  @Field({
    name: 'customer',
    description: 'Customer placing the order',
  })
  @JoinColumn({
    name: 'customer_id',
  })
  customer: string

  // Gen from: {"type":"array","description":"Bags in the Order","items":{"$ref":"#/definitions/Bag"}}
  @Field({
    name: 'bags',
    description: 'Bags in the Order',
  })
  @Column({
    name: 'bags',
  })
  bags: string

  // Gen from: {"description":"Shipping Address of the Order","$ref":"#/definitions/OrderAddress"}
  @Field({
    name: 'shipping_address',
    description: 'Shipping Address of the Order',
  })
  @JoinColumn({
    name: 'shipping_address_id',
  })
  shippingAddress: string

  // Gen from: {"description":"Billing Address of the Order","$ref":"#/definitions/OrderAddress"}
  @Field({
    name: 'billing_address',
    description: 'Billing Address of the Order',
  })
  @JoinColumn({
    name: 'billing_address_id',
  })
  billingAddress: string

  // Gen from: {"description":"Payment Method of the Order","$ref":"#/definitions/OrderPaymentMethod"}
  @Field({
    name: 'payment_method',
    description: 'Payment Method of the Order',
  })
  @JoinColumn({
    name: 'payment_method_id',
  })
  paymentMethod: string

  // Gen from: {"type":"integer","format":"int32","description":"Subtotal of the Order"}
  @Field({
    name: 'sub_total',
    description: 'Subtotal of the Order',
  })
  @Column({
    name: 'sub_total',
    type: 'bigint',
  })
  subTotal: number

  // Gen from: {"type":"integer","format":"int32","description":"Shipping Total of the Order"}
  @Field({
    name: 'shipping_total',
    description: 'Shipping Total of the Order',
  })
  @Column({
    name: 'shipping_total',
    type: 'bigint',
  })
  shippingTotal: number

  // Gen from: {"type":"integer","format":"int32","description":"Tax Total of the Order"}
  @Field({
    name: 'tax_total',
    description: 'Tax Total of the Order',
  })
  @Column({
    name: 'tax_total',
    type: 'bigint',
  })
  taxTotal: number

  // Gen from: {"type":"integer","format":"int32","description":"Total of the Order"}
  @Field({
    name: 'total',
    description: 'Total of the Order',
  })
  @Column({
    name: 'total',
    type: 'bigint',
  })
  total: number

  // Gen from: {"type":"string","description":"App Customer ID"}
  @Field({
    name: 'app_customer_id',
    description: 'App Customer ID',
  })
  @Column({
    name: 'app_customer_id',
    type: 'text',
  })
  appCustomerId: string

  // Gen from: {"type":"string","description":"App Order ID"}
  @Field({
    name: 'app_order_id',
    description: 'App Order ID',
  })
  @Column({
    name: 'app_order_id',
    type: 'text',
  })
  appOrderId: string

  // Gen from: {"type":"string","description":"Status of the Order","enum":["in_progress","processing","completed","canceled","partially_refunded","refunded"]}
  @Field({
    name: 'status',
    description: 'Status of the Order',
  })
  @Column({
    name: 'status',
    type: 'text',
  })
  status: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of order creation"}
  @Field({
    name: 'date_created',
    description: 'Date of order creation',
  })
  @Column({
    name: 'date_created',
    type: 'text',
  })
  dateCreated: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last order update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last order update',
  })
  @Column({
    name: 'date_last_modified',
    type: 'text',
  })
  dateLastModified: Date

  // Gen from: {"type":"boolean","description":"Is the customer a guest or an authed user.","default":false}
  @Field({
    name: 'guest',
    description: 'Is the customer a guest or an authed user.',
  })
  @Column({
    name: 'guest',
  })
  guest: boolean

  // Gen from: {"type":"string","description":"Optional value used to represent an identifier in your system. Max length of 128 characters."}
  @Field({
    name: 'referral_id',
    description:
      'Optional value used to represent an identifier in your system. Max length of 128 characters.',
  })
  @Column({
    name: 'referral_id',
    type: 'text',
  })
  referralId: string
}
