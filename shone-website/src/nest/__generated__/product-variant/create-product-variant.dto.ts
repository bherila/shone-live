/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<v9Qsl8ud2lFZXkTaAeepqz+sSmKn3q/B>>
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
export class CreateProductVariantDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","read_only":true}
  @Field({
    name: 'id',
  })
  @IsString()
  readonly id?: string

  // Gen from: {"type":"string","description":"Product ID"}
  @Field({
    name: 'product_id',
    description: 'Product ID',
  })
  @IsString()
  readonly productId?: string

  // Gen from: {"type":"string"}
  @Field({
    name: 'name',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"boolean","description":"Is this a visual variant","default":false}
  @Field({
    name: 'visual',
    description: 'Is this a visual variant',
  })
  readonly visual?: boolean

  // Gen from: {"type":"array","description":"Product Variant values","unique_items":true,"items":{"$ref":"#/definitions/ProductVariantValue"}}
  @Field({
    name: 'values',
    description: 'Product Variant values',
  })
  readonly values?: string

  // Gen from: {"type":"integer","format":"int32","description":"Display Order"}
  @Field({
    name: 'display_order',
    description: 'Display Order',
  })
  @IsInt()
  readonly displayOrder?: number
}
