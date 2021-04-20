/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<V24dqnSs1WegRQNAhAcZF4zFFfVHFk0D>>
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
export class CreateLoginResponseDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"read_only":true,"type":"integer","format":"int64"}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"string","description":"The users first name"}
  @Field({
    name: 'first_name',
    description: 'The users first name',
  })
  @IsString()
  readonly firstName?: string

  // Gen from: {"type":"string","description":"The users last name"}
  @Field({
    name: 'last_name',
    description: 'The users last name',
  })
  @IsString()
  readonly lastName?: string

  // Gen from: {"type":"string","description":"The users raw desired password"}
  @Field({
    name: 'password',
    description: 'The users raw desired password',
  })
  @IsString()
  readonly password?: string

  // Gen from: {"type":"string","description":"The users unique email address"}
  @Field({
    name: 'email',
    description: 'The users unique email address',
  })
  @IsString()
  @IsEmail()
  readonly email?: string

  // Gen from: {"type":"integer","format":"int32","description":"The Id of the Store the User is associated to."}
  @Field({
    name: 'merchant_id',
    description: 'The Id of the Store the User is associated to.',
  })
  @IsInt()
  readonly merchantId?: number

  // Gen from: {"type":"string","description":"The allowed values for the user type","enum":["ADMIN","MERCHANT","USER","DEVELOPER"]}
  @Field({
    name: 'type',
    description: 'The allowed values for the user type',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"boolean","description":"If a user has verified their emailed address","default":false}
  @Field({
    name: 'verified',
    description: 'If a user has verified their emailed address',
  })
  readonly verified?: boolean

  // Gen from: {"type":"string","description":"The status of the user","enum":["INACTIVE","ACTIVE","DISABLED"]}
  @Field({
    name: 'status',
    description: 'The status of the user',
  })
  @IsString()
  readonly status?: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of account creation"}
  @Field({
    name: 'date_created',
    description: 'Date of account creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last account update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last account update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date

  // Gen from: {"type":"array","unique_items":true,"items":{"$ref":"#/definitions/Role"}}
  @Field({
    name: 'roles',
  })
  readonly roles?: string

  // Gen from: {"type":"string","description":"Users Access Token. Currently expires after 1440 minutes."}
  @Field({
    name: 'token',
    description: 'Users Access Token. Currently expires after 1440 minutes.',
  })
  @IsString()
  readonly token?: string

  // Gen from: {"type":"string","description":"Users Refresh Token. Never expires."}
  @Field({
    name: 'refresh_token',
    description: 'Users Refresh Token. Never expires.',
  })
  @IsString()
  readonly refreshToken?: string
}
