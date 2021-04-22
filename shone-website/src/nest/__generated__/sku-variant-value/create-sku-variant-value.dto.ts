/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Rj8z0cZ2zQqWidkZS0s9f112nYZNm3qK>>
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
export class CreateSkuVariantValueDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"Variant Name"}
  @Field({
    name: 'variant',
    description: 'Variant Name',
  })
  @IsString()
  readonly variant?: string

  // Gen from: {"type":"string","description":"Variant Value"}
  @Field({
    name: 'value',
    description: 'Variant Value',
  })
  @IsString()
  readonly value?: string
}
