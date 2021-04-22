/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<joYFHVCWB+AEVtfCngoYO8mkBdkKmrwZ>>
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
export class CreateRoleDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"Name of the Role","min_length":1,"max_length":50,"pattern":"[A-Za-z]+"}
  @Field({
    name: 'name',
    description: 'Name of the Role',
  })
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @Matches('[A-Za-z]+')
  readonly name?: string

  // Gen from: {"type":"string","description":"Brief description of the Role","min_length":0,"max_length":255}
  @Field({
    name: 'description',
    description: 'Brief description of the Role',
  })
  @IsString()
  @MaxLength(255)
  @MinLength(0)
  readonly description?: string

  // Gen from: {"type":"array","description":"Permissions available to this Role","unique_items":true,"items":{"$ref":"#/definitions/Permission"}}
  @Field({
    name: 'permissions',
    description: 'Permissions available to this Role',
  })
  readonly permissions?: string
}
