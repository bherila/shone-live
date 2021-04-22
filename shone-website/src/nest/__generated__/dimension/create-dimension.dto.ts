/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<RnHVh9nKU7h9SMtdVvLR7NfH6TJEb6CC>>
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
export class CreateDimensionDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int64","description":"Sku ID"}
  @Field({
    name: 'sku_id',
    description: 'Sku ID',
  })
  @IsInt()
  readonly skuId?: number

  // Gen from: {"type":"string","description":"What's being measured","enum":["height","weight","width","depth"]}
  @Field({
    name: 'measure',
    description: "What's being measured",
  })
  @IsString()
  readonly measure?: string

  // Gen from: {"type":"string","description":"Type of Measurement","enum":["product","shipping"]}
  @Field({
    name: 'type',
    description: 'Type of Measurement',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"string","description":"Unit of Measure","enum":["inches","feet","centimeters","ounces","pounds","grams","kilograms"]}
  @Field({
    name: 'unit_of_measure',
    description: 'Unit of Measure',
  })
  @IsString()
  readonly unitOfMeasure?: string

  // Gen from: {"type":"number","format":"double","description":"Value"}
  @Field({
    name: 'value',
    description: 'Value',
  })
  readonly value?: number
}
