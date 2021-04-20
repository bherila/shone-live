/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<R3jowVZcBxAJzK0TJOCNH/hM1/Lc64BW>>
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
export class CreateVariantDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"ID of the Product Variant"}
  @Field({
    name: 'product_variant_id',
    description: 'ID of the Product Variant',
  })
  @IsString()
  readonly productVariantId?: string

  // Gen from: {"type":"string","description":"ID of the Variant on the External Ecommerce Platform"}
  @Field({
    name: 'external_id',
    description: 'ID of the Variant on the External Ecommerce Platform',
  })
  @IsString()
  readonly externalId?: string

  // Gen from: {"type":"string","description":"Variant Name"}
  @Field({
    name: 'name',
    description: 'Variant Name',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"boolean","description":"Is the variant visual","default":false}
  @Field({
    name: 'visual',
    description: 'Is the variant visual',
  })
  readonly visual?: boolean

  // Gen from: {"type":"array","items":{"$ref":"#/definitions/VariantValue"}}
  @Field({
    name: 'values',
  })
  readonly values?: string
}
