/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<p4kWQZ7fQr7uNDfP1raL/1QRUCI9Ikef>>
 */

import { Field, InputType } from '@nestjs/graphql'
import {
  IsDate,
  IsEmail,
  IsInt,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

@InputType()
export class CreateOrderShippingMethodDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"Type of Shipping Method","enum":["variable","flat_rate"]}
  @Field({
    name: 'type',
    description: 'Type of Shipping Method',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"string","enum":["ups","usps","fedex","dhl","ontrac"]}
  @Field({
    name: 'carrier',
  })
  @IsString()
  readonly carrier?: string

  // Gen from: {"type":"string","description":"Shipping Method Label"}
  @Field({
    name: 'label',
    description: 'Shipping Method Label',
  })
  @IsString()
  readonly label?: string

  // Gen from: {"type":"integer","format":"int32","description":"Total cost of the Shipping Method"}
  @Field({
    name: 'price',
    description: 'Total cost of the Shipping Method',
  })
  @IsInt()
  readonly price?: number

  // Gen from: {"type":"integer","format":"int32","description":"Minimum Subtotal"}
  @Field({
    name: 'min_subtotal',
    description: 'Minimum Subtotal',
  })
  @IsInt()
  readonly minSubtotal?: number

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'max_subtotal',
  })
  @IsInt()
  readonly maxSubtotal?: number

  // Gen from: {"type":"number","format":"double","description":"Minimum Weight"}
  @Field({
    name: 'min_weight',
    description: 'Minimum Weight',
  })
  readonly minWeight?: number

  // Gen from: {"type":"number","format":"double","description":"Maximum Weight"}
  @Field({
    name: 'max_weight',
    description: 'Maximum Weight',
  })
  readonly maxWeight?: number

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"string","description":"ID of the referenced Shipping Method"}
  @Field({
    name: 'shipping_method_id',
    description: 'ID of the referenced Shipping Method',
  })
  @IsString()
  readonly shippingMethodId?: string

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Bag the Shipping Method applies to"}
  @Field({
    name: 'bag_id',
    description: 'ID of the Bag the Shipping Method applies to',
  })
  @IsInt()
  readonly bagId?: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the merchant the bag belongs to"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the merchant the bag belongs to',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"string","description":"Carrier Tracking Number"}
  @Field({
    name: 'tracking_number',
    description: 'Carrier Tracking Number',
  })
  @IsString()
  readonly trackingNumber?: string
}
