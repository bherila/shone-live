/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<J+76ydBwzptE9BrMEWCKFakgTF3nCg3U>>
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
export class CreateAuthRequestDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int64","description":"App ID"}
  @Field({
    name: 'app_id',
    description: 'App ID',
  })
  @IsInt()
  readonly appId?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of User authorizing the App"}
  @Field({
    name: 'user_id',
    description: 'ID of User authorizing the App',
  })
  @IsInt()
  readonly userId?: number

  // Gen from: {"type":"string","description":"Code used to confirm the request"}
  @Field({
    name: 'code',
    description: 'Code used to confirm the request',
  })
  @IsString()
  readonly code?: string

  // Gen from: {"type":"string","description":"Authorization Token"}
  @Field({
    name: 'token',
    description: 'Authorization Token',
  })
  @IsString()
  readonly token?: string

  // Gen from: {"type":"string","description":"Status of the request","enum":["pending","completed","expired"]}
  @Field({
    name: 'status',
    description: 'Status of the request',
  })
  @IsString()
  readonly status?: string

  // Gen from: {"type":"string","description":"Scope of the requested permissions"}
  @Field({
    name: 'scope',
    description: 'Scope of the requested permissions',
  })
  @IsString()
  readonly scope?: string

  // Gen from: {"type":"string","format":"date-time","description":"Time the request expires","read_only":true}
  @Field({
    name: 'date_expires',
    description: 'Time the request expires',
  })
  @IsString()
  @IsDate()
  readonly dateExpires?: Date
}
