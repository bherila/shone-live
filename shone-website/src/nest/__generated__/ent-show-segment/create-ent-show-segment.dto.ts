/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<4frQZgA2w7DKF+K8UHKGp0t/PXva0nPZ>>
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
export class CreateEntShowSegmentDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"","$ref":"#/definitions/EntShow"}
  @Field({
    name: 'show',
  })
  readonly show?: string

  // Gen from: {"type":"string","description":"title of the show segment, for shows with 1 segment this can be null"}
  @Field({
    name: 'title',
    description:
      'title of the show segment, for shows with 1 segment this can be null',
  })
  @IsString()
  readonly title?: string

  // Gen from: {"type":"string","description":"description of the show segment"}
  @Field({
    name: 'description',
    description: 'description of the show segment',
  })
  @IsString()
  readonly description?: string
}
