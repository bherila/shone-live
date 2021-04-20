/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<mDwWEBLBdNpqQ8iR77+zBnDq3+rIeI8z>>
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
export class CreateBagDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Order the Bag belongs to"}
  @Field({
    name: 'order_id',
    description: 'ID of the Order the Bag belongs to',
  })
  @IsInt()
  readonly orderId?: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant the Bag references"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant the Bag references',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the App creating this Bag"}
  @Field({
    name: 'app_id',
    description: 'ID of the App creating this Bag',
  })
  @IsInt()
  readonly appId?: number

  // Gen from: {"type":"string","description":"ID of the Order on the External Ecommerce Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the Order on the External Ecommerce Platform',
  })
  @IsString()
  readonly externalId?: string

  // Gen from: {"type":"string","description":"Status","enum":["in_progress","submitted","accepted","shipped","completed","rejected","canceled"]}
  @Field({
    name: 'status',
    description: 'Status',
  })
  @IsString()
  readonly status?: string

  // Gen from: {"type":"string","description":"Fulfillment Status","enum":["unshipped","shipped","partially_shipped","returned"]}
  @Field({
    name: 'fulfillment_status',
    description: 'Fulfillment Status',
  })
  @IsString()
  readonly fulfillmentStatus?: string

  // Gen from: {"type":"string","description":"Financial Status","enum":["unpaid","authorized","pending","paid","partially_paid","refunded","partially_refunded","voided"]}
  @Field({
    name: 'financial_status',
    description: 'Financial Status',
  })
  @IsString()
  readonly financialStatus?: string

  // Gen from: {"type":"array","description":"SKUs added to the bag","items":{"$ref":"#/definitions/OrderSku"}}
  @Field({
    name: 'skus',
    description: 'SKUs added to the bag',
  })
  readonly skus?: string

  // Gen from: {"description":"Shipping Method of the Bag","$ref":"#/definitions/OrderShippingMethod"}
  @Field({
    name: 'shipping_method',
    description: 'Shipping Method of the Bag',
  })
  readonly shippingMethod?: string

  // Gen from: {"type":"array","description":"Taxes applied to the bag","items":{"$ref":"#/definitions/OrderTax"}}
  @Field({
    name: 'taxes',
    description: 'Taxes applied to the bag',
  })
  readonly taxes?: string

  // Gen from: {"type":"integer","format":"int32","description":"Subtotal of the bag"}
  @Field({
    name: 'sub_total',
    description: 'Subtotal of the bag',
  })
  @IsInt()
  readonly subTotal?: number

  // Gen from: {"type":"integer","format":"int32","description":"Shipping Total of the bag"}
  @Field({
    name: 'shipping_total',
    description: 'Shipping Total of the bag',
  })
  @IsInt()
  readonly shippingTotal?: number

  // Gen from: {"type":"integer","format":"int32","description":"Tax Total of the bag"}
  @Field({
    name: 'tax_total',
    description: 'Tax Total of the bag',
  })
  @IsInt()
  readonly taxTotal?: number

  // Gen from: {"type":"integer","format":"int32","description":"Total price of the bag"}
  @Field({
    name: 'total',
    description: 'Total price of the bag',
  })
  @IsInt()
  readonly total?: number

  // Gen from: {"type":"array","description":"Transactions of the bag","items":{"$ref":"#/definitions/Transaction"}}
  @Field({
    name: 'transactions',
    description: 'Transactions of the bag',
  })
  readonly transactions?: string

  // Gen from: {"type":"boolean","description":"If bag is tracked externally","default":false}
  @Field({
    name: 'external_checkout',
    description: 'If bag is tracked externally',
  })
  readonly externalCheckout?: boolean

  // Gen from: {"type":"string","description":"Name of Merchant"}
  @Field({
    name: 'merchant_name',
    description: 'Name of Merchant',
  })
  @IsString()
  readonly merchantName?: string
}
