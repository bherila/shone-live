/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<59W1ak1Syts++ubi9j93fi6aExYOZT13>>
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
export class CreateCustomerAddressDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"description":"Customer","$ref":"#/definitions/OrderCustomer"}
  @Field({
    name: 'customer',
    description: 'Customer',
  })
  readonly customer?: string

  // Gen from: {"description":"Customer Shipping Address","$ref":"#/definitions/OrderAddress"}
  @Field({
    name: 'shipping_address',
    description: 'Customer Shipping Address',
  })
  readonly shippingAddress?: string

  // Gen from: {"description":"Customer Billing Address","$ref":"#/definitions/OrderAddress"}
  @Field({
    name: 'billing_address',
    description: 'Customer Billing Address',
  })
  readonly billingAddress?: string
}
