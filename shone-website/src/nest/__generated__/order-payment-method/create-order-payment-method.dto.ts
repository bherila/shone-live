/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<3e9ueq8cV4hDa4dCy7Co+zJK6DVh0HPe>>
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
export class CreateOrderPaymentMethodDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"Brand of Card"}
  @Field({
    name: 'brand',
    description: 'Brand of Card',
  })
  @IsString()
  readonly brand?: string

  // Gen from: {"type":"string","description":"Last Four Numbers on Card"}
  @Field({
    name: 'last_four',
    description: 'Last Four Numbers on Card',
  })
  @IsString()
  readonly lastFour?: string

  // Gen from: {"type":"integer","format":"int32","description":"Card Expiration Month"}
  @Field({
    name: 'exp_month',
    description: 'Card Expiration Month',
  })
  @IsInt()
  readonly expMonth?: number

  // Gen from: {"type":"integer","format":"int32","description":"Card Expiration Year"}
  @Field({
    name: 'exp_year',
    description: 'Card Expiration Year',
  })
  @IsInt()
  readonly expYear?: number

  // Gen from: {"type":"string","description":"Name as it appears on card."}
  @Field({
    name: 'cardholder_name',
    description: 'Name as it appears on card.',
  })
  @IsString()
  readonly cardholderName?: string

  // Gen from: {"type":"integer","format":"int64","description":"ID of the referenced Payment Method"}
  @Field({
    name: 'payment_method_id',
    description: 'ID of the referenced Payment Method',
  })
  @IsInt()
  readonly paymentMethodId?: number

  // Gen from: {"type":"boolean","description":"Is Default Method","default":false}
  @Field({
    name: 'default',
    description: 'Is Default Method',
  })
  readonly default?: boolean
}
