/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<1ChDcXTbun87Fqye/mlZ3jyIc+xHqFff>>
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
export class CreateCategoryDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","read_only":true}
  @Field({
    name: 'id',
  })
  @IsString()
  readonly id?: string

  // Gen from: {"type":"string","description":"Category Name"}
  @Field({
    name: 'name',
    description: 'Category Name',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"string","description":"Category Slug"}
  @Field({
    name: 'slug',
    description: 'Category Slug',
  })
  @IsString()
  readonly slug?: string

  // Gen from: {"type":"string","description":"Parent ID"}
  @Field({
    name: 'parent_id',
    description: 'Parent ID',
  })
  @IsString()
  readonly parentId?: string

  // Gen from: {"type":"integer","format":"int32","description":"Category Depth"}
  @Field({
    name: 'depth',
    description: 'Category Depth',
  })
  @IsInt()
  readonly depth?: number
}
