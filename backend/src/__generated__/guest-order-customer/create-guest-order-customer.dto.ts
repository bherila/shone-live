/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<VBPilaNSjlrg55A+9XL0BQhdip250h2y>>
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
export class CreateGuestOrderCustomerDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"First Name"}
  @Field({
    name: 'first_name',
    description: 'First Name',
  })
  @IsString()
  readonly firstName?: string

  // Gen from: {"type":"string","description":"Last Name"}
  @Field({
    name: 'last_name',
    description: 'Last Name',
  })
  @IsString()
  readonly lastName?: string

  // Gen from: {"type":"string","description":"Email Address of Customer"}
  @Field({
    name: 'email',
    description: 'Email Address of Customer',
  })
  @IsString()
  @IsEmail()
  readonly email?: string
}
