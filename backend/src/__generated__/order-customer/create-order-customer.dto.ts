/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<7w1c38QluNE7acmNWSL1cPahksHxH/Sm>>
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
export class CreateOrderCustomerDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","description":"ID of the User the Order Customer references"}
  @Field({
    name: 'user_id',
    description: 'ID of the User the Order Customer references',
  })
  @IsInt()
  readonly userId?: number

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

  // Gen from: {"type":"string"}
  @Field({
    name: 'name',
  })
  @IsString()
  readonly name?: string
}
