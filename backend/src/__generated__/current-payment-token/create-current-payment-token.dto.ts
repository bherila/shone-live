/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<C2lYr0Dy87Iptq3X8djOGnEBbk7UNFBx>>
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
export class CreateCurrentPaymentTokenDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"Stripe Public Token"}
  @Field({
    name: 'stripe_token',
    description: 'Stripe Public Token',
  })
  @IsString()
  readonly stripeToken?: string
}
