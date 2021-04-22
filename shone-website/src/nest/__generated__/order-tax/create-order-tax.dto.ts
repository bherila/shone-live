/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<LB/CLP9OXtJHtSOkZQcgDMbklFfAULjV>>
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
export class CreateOrderTaxDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","description":"ID of the Order the Tax belongs to"}
  @Field({
    name: 'order_id',
    description: 'ID of the Order the Tax belongs to',
  })
  @IsInt()
  readonly orderId?: number

  // Gen from: {"type":"integer","format":"int32","description":"ID of the Merchant the Bag belongs to"}
  @Field({
    name: 'merchant_id',
    description: 'ID of the Merchant the Bag belongs to',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"array","description":"SKUs covered by the Tax","items":{"type":"string"}}
  @Field({
    name: 'skus',
    description: 'SKUs covered by the Tax',
  })
  readonly skus?: string

  // Gen from: {"type":"string","description":"State abbreviation"}
  @Field({
    name: 'state',
    description: 'State abbreviation',
  })
  @IsString()
  readonly state?: string

  // Gen from: {"type":"string","description":"Postal/Zip Code"}
  @Field({
    name: 'postal_code',
    description: 'Postal/Zip Code',
  })
  @IsString()
  readonly postalCode?: string

  // Gen from: {"type":"number","format":"double","description":"Tax Rate"}
  @Field({
    name: 'rate',
    description: 'Tax Rate',
  })
  readonly rate?: number

  // Gen from: {"type":"integer","format":"int32","description":"Total Tax amount on Bag"}
  @Field({
    name: 'amount',
    description: 'Total Tax amount on Bag',
  })
  @IsInt()
  readonly amount?: number

  // Gen from: {"type":"string","description":"Description of the Tax","min_length":0,"max_length":255}
  @Field({
    name: 'description',
    description: 'Description of the Tax',
  })
  @IsString()
  @MaxLength(255)
  @MinLength(0)
  readonly description?: string
}
