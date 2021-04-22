/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<mGYDyDsrj8PxmVj7g4ifVTBenJyzjbcS>>
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
export class CreateOrderShippingMethodWrapperDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64"}
  @Field({
    name: 'bag_id',
  })
  @IsInt()
  readonly bagId?: number

  // Gen from: {"type":"array","items":{"$ref":"#/definitions/OrderShippingMethod"}}
  @Field({
    name: 'shipping_methods',
  })
  readonly shippingMethods?: string
}
