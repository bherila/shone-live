/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<e3Hd1V7XhP6GGjGmrNRg4Y/Xvvqk8cQ4>>
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
export class CreateAppDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int64","description":"User ID of Owner"}
  @Field({
    name: 'owner_id',
    description: 'User ID of Owner',
  })
  @IsInt()
  readonly ownerId?: number

  // Gen from: {"type":"string"}
  @Field({
    name: 'app_secret',
  })
  @IsString()
  readonly appSecret?: string

  // Gen from: {"type":"string","description":"The name of the team/business/project"}
  @Field({
    name: 'name',
    description: 'The name of the team/business/project',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"string","description":"App description"}
  @Field({
    name: 'description',
    description: 'App description',
  })
  @IsString()
  readonly description?: string

  // Gen from: {"type":"string","description":"Remote Callback URL"}
  @Field({
    name: 'auth_callback_url',
    description: 'Remote Callback URL',
  })
  @IsString()
  readonly authCallbackUrl?: string

  // Gen from: {"type":"string","description":"Auth Redirect URL"}
  @Field({
    name: 'auth_redirect_url',
    description: 'Auth Redirect URL',
  })
  @IsString()
  readonly authRedirectUrl?: string

  // Gen from: {"type":"string","description":"Remote url of the icon file."}
  @Field({
    name: 'icon_url',
    description: 'Remote url of the icon file.',
  })
  @IsString()
  readonly iconUrl?: string

  // Gen from: {"type":"string","description":"API Version"}
  @Field({
    name: 'api_version',
    description: 'API Version',
  })
  @IsString()
  readonly apiVersion?: string

  // Gen from: {"type":"string","description":"App Status","enum":["inactive","active","disabled"]}
  @Field({
    name: 'status',
    description: 'App Status',
  })
  @IsString()
  readonly status?: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of account creation","read_only":true}
  @Field({
    name: 'date_created',
    description: 'Date of account creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last account update","read_only":true}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last account update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date
}
