/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<LFgQHpSwdeoK1hdoNaWTmO0kTehEv+6G>>
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
export class CreatePageOrderDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'total_pages',
  })
  @IsInt()
  readonly totalPages?: number

  // Gen from: {"type":"integer","format":"int64"}
  @Field({
    name: 'total_elements',
  })
  @IsInt()
  readonly totalElements?: number

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'size',
  })
  @IsInt()
  readonly size?: number

  // Gen from: {"type":"array","items":{"$ref":"#/definitions/Order"}}
  @Field({
    name: 'content',
  })
  readonly content?: string

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'number',
  })
  @IsInt()
  readonly number?: number

  // Gen from: {"$ref":"#/definitions/Sort"}
  @Field({
    name: 'sort',
  })
  readonly sort?: string

  // Gen from: {"type":"boolean","default":false}
  @Field({
    name: 'first',
  })
  readonly first?: boolean

  // Gen from: {"type":"boolean","default":false}
  @Field({
    name: 'last',
  })
  readonly last?: boolean

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'number_of_elements',
  })
  @IsInt()
  readonly numberOfElements?: number
}
