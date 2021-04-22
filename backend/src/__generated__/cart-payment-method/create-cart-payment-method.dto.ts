/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<wt3jx8nroj14WgqXv9guPD+083bZSvMA>>
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
export class CreateCartPaymentMethodDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"Generated payment token."}
  @Field({
    name: 'token',
    description: 'Generated payment token.',
  })
  @IsString()
  readonly token?: string

  // Gen from: {"type":"string","description":"Number on the credit or debit card."}
  @Field({
    name: 'card_number',
    description: 'Number on the credit or debit card.',
  })
  @IsString()
  readonly cardNumber?: string

  // Gen from: {"type":"integer","format":"int32","description":"CVC code on the credit or debit card."}
  @Field({
    name: 'card_cvc',
    description: 'CVC code on the credit or debit card.',
  })
  @IsInt()
  readonly cardCvc?: number

  // Gen from: {"type":"integer","format":"int32","description":"Expiration month of the credit or debit card."}
  @Field({
    name: 'card_exp_month',
    description: 'Expiration month of the credit or debit card.',
  })
  @IsInt()
  readonly cardExpMonth?: number

  // Gen from: {"type":"integer","format":"int32","description":"Expiration year of the credit or debit card."}
  @Field({
    name: 'card_exp_year',
    description: 'Expiration year of the credit or debit card.',
  })
  @IsInt()
  readonly cardExpYear?: number

  // Gen from: {"type":"string","description":"Postal Code of the credit or debit card."}
  @Field({
    name: 'card_postal_code',
    description: 'Postal Code of the credit or debit card.',
  })
  @IsString()
  readonly cardPostalCode?: string
}
