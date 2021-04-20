/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ke0p/naKRQqCsP8HqD8kZVPRuRnzqLrN>>
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
export class CreateEventDto {
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

  // Gen from: {"type":"integer","format":"int64","description":"User ID"}
  @Field({
    name: 'user_id',
    description: 'User ID',
  })
  @IsInt()
  readonly userId?: number

  // Gen from: {"type":"string","description":"The type of event","enum":["create","update","delete"]}
  @Field({
    name: 'type',
    description: 'The type of event',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"string","description":"Message event body","min_length":0,"max_length":255}
  @Field({
    name: 'message',
    description: 'Message event body',
  })
  @IsString()
  @MaxLength(255)
  @MinLength(0)
  readonly message?: string

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
