/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<nCjjcB5Ggo1CLTZODhz1Nv3Xu3Yby52w>>
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
export class CreateMetaDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int64","description":"Offer Id"}
  @Field({
    name: 'offer_id',
    description: 'Offer Id',
  })
  @IsInt()
  readonly offerId?: number

  // Gen from: {"type":"string","description":"Key"}
  @Field({
    name: 'key',
    description: 'Key',
  })
  @IsString()
  readonly key?: string

  // Gen from: {"type":"string","description":"Value"}
  @Field({
    name: 'value',
    description: 'Value',
  })
  @IsString()
  readonly value?: string
}
