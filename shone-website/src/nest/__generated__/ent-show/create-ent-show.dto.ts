/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<cQlClcgV0+TN3FHzBuwmyUr4qpPwe/qs>>
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
export class CreateEntShowDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"title of the show"}
  @Field({
    name: 'title',
    description: 'title of the show',
  })
  @IsString()
  readonly title?: string

  // Gen from: {"type":"string","description":"description of the show"}
  @Field({
    name: 'description',
    description: 'description of the show',
  })
  @IsString()
  readonly description?: string

  // Gen from: {"type":"string","description":"date and time the show will start (store in UTC"}
  @Field({
    name: 'start_date',
    description: 'date and time the show will start (store in UTC',
  })
  @IsString()
  readonly startDate?: string

  // Gen from: {"type":"string","description":"date and time the show will end (store in UTC)"}
  @Field({
    name: 'end_date',
    description: 'date and time the show will end (store in UTC)',
  })
  @IsString()
  readonly endDate?: string
}
