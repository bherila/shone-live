/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<QfaYCugQC2CZgGmzdumT6b8ChGF/SFe7>>
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
export class CreateLoginRequestDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"User Email Address"}
  @Field({
    name: 'username',
    description: 'User Email Address',
  })
  @IsString()
  readonly username?: string

  // Gen from: {"type":"string","description":"User Password"}
  @Field({
    name: 'password',
    description: 'User Password',
  })
  @IsString()
  readonly password?: string
}
