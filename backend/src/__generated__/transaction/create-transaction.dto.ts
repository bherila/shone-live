/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<6kVqws1XXZQKT4I5K7x+WArCGAB8hmor>>
 */

import { Field, InputType } from '@nestjs/graphql'
import {
  IsEmail,
  IsString,
  IsInt,
  IsDate,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator'

@InputType()
export class CreateTransactionDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant receiving the transaction"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant receiving the transaction',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the User who facilitated the transaction"}
  @Field({
    name: 'seller_id',
    description: 'ID of the User who facilitated the transaction',
  })
  @IsInt()
  readonly sellerId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the App that created the Order"}
  @Field({
    name: 'app_id',
    description: 'ID of the App that created the Order',
  })
  @IsInt()
  readonly appId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Order the Transaction applies to"}
  @Field({
    name: 'order_id',
    description: 'ID of the Order the Transaction applies to',
  })
  @IsInt()
  readonly orderId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Bag the Transaction applies to"}
  @Field({
    name: 'bag_id',
    description: 'ID of the Bag the Transaction applies to',
  })
  @IsInt()
  readonly bagId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the referenced Payment Method"}
  @Field({
    name: 'payment_method_id',
    description: 'ID of the referenced Payment Method',
  })
  @IsInt()
  readonly paymentMethodId?: number

  // Gen from: {"type":"string","description":"ID of the Transaction in the Payment Gateway"}
  @Field({
    name: 'gateway_transaction_id',
    description: 'ID of the Transaction in the Payment Gateway',
  })
  @IsString()
  readonly gatewayTransactionId?: string

  // Gen from: {"type":"string","description":"Gateway processing the Transaction"}
  @Field({
    name: 'gateway',
    description: 'Gateway processing the Transaction',
  })
  @IsString()
  readonly gateway?: string

  // Gen from: {"type":"integer","format":"int32","description":"Total amount being transacted"}
  @Field({
    name: 'amount',
    description: 'Total amount being transacted',
  })
  @IsInt()
  readonly amount?: number

  // Gen from: {"type":"string","description":"Currency the Transaction takes place in"}
  @Field({
    name: 'currency',
    description: 'Currency the Transaction takes place in',
  })
  @IsString()
  readonly currency?: string

  // Gen from: {"type":"string","description":"Transaction Type","enum":["authorization","capture","sale","void","refund"]}
  @Field({
    name: 'type',
    description: 'Transaction Type',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"string","description":"Error Code from gateway if error occurred"}
  @Field({
    name: 'error_code',
    description: 'Error Code from gateway if error occurred',
  })
  @IsString()
  readonly errorCode?: string

  // Gen from: {"type":"string","description":"Transaction Status","enum":["processing","completed"]}
  @Field({
    name: 'status',
    description: 'Transaction Status',
  })
  @IsString()
  readonly status?: string

  // Gen from: {"type":"boolean","description":"Is this a test Transaction","default":false}
  @Field({
    name: 'test',
    description: 'Is this a test Transaction',
  })
  readonly test?: boolean

  // Gen from: {"type":"string","format":"date-time","description":"Date of transaction creation"}
  @Field({
    name: 'date_created',
    description: 'Date of transaction creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last transaction update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last transaction update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date

  // Gen from: {"$ref":"#/definitions/OrderPaymentMethod"}
  @Field({
    name: 'orderPaymentMethod',
  })
  readonly orderPaymentMethod?: string
}
