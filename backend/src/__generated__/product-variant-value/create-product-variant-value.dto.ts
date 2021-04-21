/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<g3J8GYPCppyVCahc+lkWzsY0oXrqfC/K>>
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
export class CreateProductVariantValueDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","read_only":true}
  @Field({
    name: 'id',
  })
  @IsString()
  readonly id?: string

  // Gen from: {"type":"string","description":"ID of the Variation"}
  @Field({
    name: 'variant_id',
    description: 'ID of the Variation',
  })
  @IsString()
  readonly variantId?: string

  // Gen from: {"type":"string","description":"Name"}
  @Field({
    name: 'name',
    description: 'Name',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"integer","format":"int32","description":"Display Order"}
  @Field({
    name: 'display_order',
    description: 'Display Order',
  })
  @IsInt()
  readonly displayOrder?: number

  // Gen from: {"type":"string","description":"Color/Pattern Swatch URL"}
  @Field({
    name: 'swatch',
    description: 'Color/Pattern Swatch URL',
  })
  @IsString()
  readonly swatch?: string

  // Gen from: {"type":"string","description":"Hex Code"}
  @Field({
    name: 'hex',
    description: 'Hex Code',
  })
  @IsString()
  readonly hex?: string
}
