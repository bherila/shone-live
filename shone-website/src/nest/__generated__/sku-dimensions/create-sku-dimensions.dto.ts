/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<yfQEesCz4DbOVgQLsR06MxQRnGsJ0E6d>>
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
export class CreateSkuDimensionsDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","description":"ID of SKU Dimensions Belong To"}
  @Field({
    name: 'sku_id',
    description: 'ID of SKU Dimensions Belong To',
  })
  @IsInt()
  readonly skuId?: number

  // Gen from: {"type":"number","format":"double","description":"Weight of SKU"}
  @Field({
    name: 'weight',
    description: 'Weight of SKU',
  })
  readonly weight?: number

  // Gen from: {"type":"number","format":"double","description":"Height of SKU"}
  @Field({
    name: 'height',
    description: 'Height of SKU',
  })
  readonly height?: number

  // Gen from: {"type":"number","format":"double","description":"Width of SKU"}
  @Field({
    name: 'width',
    description: 'Width of SKU',
  })
  readonly width?: number

  // Gen from: {"type":"number","format":"double","description":"Length of SKU"}
  @Field({
    name: 'length',
    description: 'Length of SKU',
  })
  readonly length?: number

  // Gen from: {"type":"string","description":"Dimensions Type","enum":["SKU","SHIPPING"]}
  @Field({
    name: 'type',
    description: 'Dimensions Type',
  })
  @IsString()
  readonly type?: string
}
