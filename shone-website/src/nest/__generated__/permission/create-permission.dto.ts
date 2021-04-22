/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Fo3MhVZAklK7V2BOg3boaM0wdS8quZrr>>
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
export class CreatePermissionDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"Name of the Permission","min_length":1,"max_length":50,"pattern":"[A-Za-z]+"}
  @Field({
    name: 'name',
    description: 'Name of the Permission',
  })
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @Matches('[A-Za-z]+')
  readonly name?: string

  // Gen from: {"type":"string","description":"Brief description of the Permission","min_length":0,"max_length":255}
  @Field({
    name: 'description',
    description: 'Brief description of the Permission',
  })
  @IsString()
  @MaxLength(255)
  @MinLength(0)
  readonly description?: string
}
