/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<iv8j7QUE74Mz8kfnbOcd3L8VhECyTrue>>
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
export class CreateOrderSearchRequestDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","description":"User ID"}
  @Field({
    name: 'user_id',
    description: 'User ID',
  })
  @IsInt()
  readonly userId?: number

  // Gen from: {"type":"integer","format":"int32","description":"Merchant ID"}
  @Field({
    name: 'merchant_id',
    description: 'Merchant ID',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"string","description":"Referral ID"}
  @Field({
    name: 'referral_id',
    description: 'Referral ID',
  })
  @IsString()
  readonly referralId?: string
}
