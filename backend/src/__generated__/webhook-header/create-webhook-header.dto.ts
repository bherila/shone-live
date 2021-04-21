/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<b38yVpr1JJclhIcTdStqvDX4nDhzObJk>>
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
export class CreateWebhookHeaderDto {
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

  // Gen from: {"type":"integer","format":"int64","description":"ID of the webhook the header belongs to"}
  @Field({
    name: 'webhook_id',
    description: 'ID of the webhook the header belongs to',
  })
  @IsInt()
  readonly webhookId?: number

  // Gen from: {"type":"string","description":"Header Key"}
  @Field({
    name: 'key',
    description: 'Header Key',
  })
  @IsString()
  readonly key?: string

  // Gen from: {"type":"string","description":"Header Value"}
  @Field({
    name: 'value',
    description: 'Header Value',
  })
  @IsString()
  readonly value?: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of webhook header creation","read_only":true}
  @Field({
    name: 'date_created',
    description: 'Date of webhook header creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last webhook header update","read_only":true}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last webhook header update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date
}
