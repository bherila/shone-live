/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ul2tCsTfFVV/rLHYGirtjIbpeIlSkSnH>>
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
@Entity({ name: 'transaction' })
export class Transaction {
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

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant receiving the transaction"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant receiving the transaction',
  })
  @Column({
    name: 'merchant_id',
    type: 'bigint',
  })
  merchantId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the User who facilitated the transaction"}
  @Field({
    name: 'seller_id',
    description: 'ID of the User who facilitated the transaction',
  })
  @Column({
    name: 'seller_id',
    type: 'bigint',
  })
  sellerId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the App that created the Order"}
  @Field({
    name: 'app_id',
    description: 'ID of the App that created the Order',
  })
  @Column({
    name: 'app_id',
    type: 'bigint',
  })
  appId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Order the Transaction applies to"}
  @Field({
    name: 'order_id',
    description: 'ID of the Order the Transaction applies to',
  })
  @Column({
    name: 'order_id',
    type: 'bigint',
  })
  orderId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Bag the Transaction applies to"}
  @Field({
    name: 'bag_id',
    description: 'ID of the Bag the Transaction applies to',
  })
  @Column({
    name: 'bag_id',
    type: 'bigint',
  })
  bagId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the referenced Payment Method"}
  @Field({
    name: 'payment_method_id',
    description: 'ID of the referenced Payment Method',
  })
  @Column({
    name: 'payment_method_id',
    type: 'bigint',
  })
  paymentMethodId: number

  // Gen from: {"type":"string","description":"ID of the Transaction in the Payment Gateway"}
  @Field({
    name: 'gateway_transaction_id',
    description: 'ID of the Transaction in the Payment Gateway',
  })
  @Column({
    name: 'gateway_transaction_id',
    type: 'text',
  })
  gatewayTransactionId: string

  // Gen from: {"type":"string","description":"Gateway processing the Transaction"}
  @Field({
    name: 'gateway',
    description: 'Gateway processing the Transaction',
  })
  @Column({
    name: 'gateway',
    type: 'text',
  })
  gateway: string

  // Gen from: {"type":"integer","format":"int32","description":"Total amount being transacted"}
  @Field({
    name: 'amount',
    description: 'Total amount being transacted',
  })
  @Column({
    name: 'amount',
    type: 'bigint',
  })
  amount: number

  // Gen from: {"type":"string","description":"Currency the Transaction takes place in"}
  @Field({
    name: 'currency',
    description: 'Currency the Transaction takes place in',
  })
  @Column({
    name: 'currency',
    type: 'text',
  })
  currency: string

  // Gen from: {"type":"string","description":"Transaction Type","enum":["authorization","capture","sale","void","refund"]}
  @Field({
    name: 'type',
    description: 'Transaction Type',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"string","description":"Error Code from gateway if error occurred"}
  @Field({
    name: 'error_code',
    description: 'Error Code from gateway if error occurred',
  })
  @Column({
    name: 'error_code',
    type: 'text',
  })
  errorCode: string

  // Gen from: {"type":"string","description":"Transaction Status","enum":["processing","completed"]}
  @Field({
    name: 'status',
    description: 'Transaction Status',
  })
  @Column({
    name: 'status',
    type: 'text',
  })
  status: string

  // Gen from: {"type":"boolean","description":"Is this a test Transaction","default":false}
  @Field({
    name: 'test',
    description: 'Is this a test Transaction',
  })
  @Column({
    name: 'test',
  })
  test: boolean

  // Gen from: {"type":"string","format":"date-time","description":"Date of transaction creation"}
  @Field({
    name: 'date_created',
    description: 'Date of transaction creation',
  })
  @Column({
    name: 'date_created',
    type: 'text',
  })
  dateCreated: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last transaction update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last transaction update',
  })
  @Column({
    name: 'date_last_modified',
    type: 'text',
  })
  dateLastModified: Date

  // Gen from: {"$ref":"#/definitions/OrderPaymentMethod"}
  @Field({
    name: 'orderPaymentMethod',
  })
  @JoinColumn({
    name: 'orderPaymentMethod_id',
  })
  orderPaymentMethod: string
}
