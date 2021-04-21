/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<4EJlQ9Mm8pLKcVLK5qQdLJQKYbV9Trtu>>
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
export class CreateWebhookDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'app_id',
  })
  @IsInt()
  readonly appId?: number

  // Gen from: {"type":"string","description":"The event being triggered","enum":["order_updated","order_shipped","order_completed","order_canceled"]}
  @Field({
    name: 'event',
    description: 'The event being triggered',
  })
  @IsString()
  readonly event?: string

  // Gen from: {"type":"string","description":"Remote endpoint the webhook posts against."}
  @Field({
    name: 'remote_endpoint',
    description: 'Remote endpoint the webhook posts against.',
  })
  @IsString()
  readonly remoteEndpoint?: string

  // Gen from: {"type":"string","description":"Status of the webhook","enum":["inactive","active","disabled"]}
  @Field({
    name: 'status',
    description: 'Status of the webhook',
  })
  @IsString()
  readonly status?: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of webhook creation","read_only":true}
  @Field({
    name: 'date_created',
    description: 'Date of webhook creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last webhook update","read_only":true}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last webhook update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date
}
