/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<43ZCrWfYfWHkDtiUnf5uK4nDacxgKCF3>>
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
export class CreateOrderDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"string","read_only":true}
  @Field({
    name: 'token',
  })
  @IsString()
  readonly token?: string

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Seller"}
  @Field({
    name: 'seller_id',
    description: 'ID of the Seller',
  })
  @IsInt()
  readonly sellerId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the User placing the order"}
  @Field({
    name: 'user_id',
    description: 'ID of the User placing the order',
  })
  @IsInt()
  readonly userId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the App creating the order"}
  @Field({
    name: 'app_id',
    description: 'ID of the App creating the order',
  })
  @IsInt()
  readonly appId?: number

  // Gen from: {"description":"Customer placing the order","$ref":"#/definitions/OrderCustomer"}
  @Field({
    name: 'customer',
    description: 'Customer placing the order',
  })
  readonly customer?: string

  // Gen from: {"type":"array","description":"Bags in the Order","items":{"$ref":"#/definitions/Bag"}}
  @Field({
    name: 'bags',
    description: 'Bags in the Order',
  })
  readonly bags?: string

  // Gen from: {"description":"Shipping Address of the Order","$ref":"#/definitions/OrderAddress"}
  @Field({
    name: 'shipping_address',
    description: 'Shipping Address of the Order',
  })
  readonly shippingAddress?: string

  // Gen from: {"description":"Billing Address of the Order","$ref":"#/definitions/OrderAddress"}
  @Field({
    name: 'billing_address',
    description: 'Billing Address of the Order',
  })
  readonly billingAddress?: string

  // Gen from: {"description":"Payment Method of the Order","$ref":"#/definitions/OrderPaymentMethod"}
  @Field({
    name: 'payment_method',
    description: 'Payment Method of the Order',
  })
  readonly paymentMethod?: string

  // Gen from: {"type":"integer","format":"int32","description":"Subtotal of the Order"}
  @Field({
    name: 'sub_total',
    description: 'Subtotal of the Order',
  })
  @IsInt()
  readonly subTotal?: number

  // Gen from: {"type":"integer","format":"int32","description":"Shipping Total of the Order"}
  @Field({
    name: 'shipping_total',
    description: 'Shipping Total of the Order',
  })
  @IsInt()
  readonly shippingTotal?: number

  // Gen from: {"type":"integer","format":"int32","description":"Tax Total of the Order"}
  @Field({
    name: 'tax_total',
    description: 'Tax Total of the Order',
  })
  @IsInt()
  readonly taxTotal?: number

  // Gen from: {"type":"integer","format":"int32","description":"Total of the Order"}
  @Field({
    name: 'total',
    description: 'Total of the Order',
  })
  @IsInt()
  readonly total?: number

  // Gen from: {"type":"string","description":"App Customer ID"}
  @Field({
    name: 'app_customer_id',
    description: 'App Customer ID',
  })
  @IsString()
  readonly appCustomerId?: string

  // Gen from: {"type":"string","description":"App Order ID"}
  @Field({
    name: 'app_order_id',
    description: 'App Order ID',
  })
  @IsString()
  readonly appOrderId?: string

  // Gen from: {"type":"string","description":"Status of the Order","enum":["in_progress","processing","completed","canceled","partially_refunded","refunded"]}
  @Field({
    name: 'status',
    description: 'Status of the Order',
  })
  @IsString()
  readonly status?: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of order creation"}
  @Field({
    name: 'date_created',
    description: 'Date of order creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last order update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last order update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date

  // Gen from: {"type":"boolean","description":"Is the customer a guest or an authed user.","default":false}
  @Field({
    name: 'guest',
    description: 'Is the customer a guest or an authed user.',
  })
  readonly guest?: boolean

  // Gen from: {"type":"string","description":"Optional value used to represent an identifier in your system. Max length of 128 characters."}
  @Field({
    name: 'referral_id',
    description:
      'Optional value used to represent an identifier in your system. Max length of 128 characters.',
  })
  @IsString()
  readonly referralId?: string
}
