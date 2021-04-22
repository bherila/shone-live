/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<xDBf2K3mhDhKC4fr6KqOafevvmepUwKf>>
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
export class CreateBagShippingMethodDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64"}
  @Field({
    name: 'bag_id',
  })
  @IsInt()
  readonly bagId?: number

  // Gen from: {"type":"string"}
  @Field({
    name: 'shipping_method_id',
  })
  @IsString()
  readonly shippingMethodId?: string
}
