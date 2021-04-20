/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<JvL0q6HFBm5cWb/Gqimi4oyxGrqBUFXS>>
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
export class CreateWebhookErrorDto {
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

  // Gen from: {"type":"integer","format":"int64","description":"ID of the webhook the error occurred on"}
  @Field({
    name: 'webhook_id',
    description: 'ID of the webhook the error occurred on',
  })
  @IsInt()
  readonly webhookId?: number

  // Gen from: {"type":"integer","format":"int32","description":"HTTP Status Code"}
  @Field({
    name: 'status_code',
    description: 'HTTP Status Code',
  })
  @IsInt()
  readonly statusCode?: number

  // Gen from: {"type":"string","description":"Response from the remote url"}
  @Field({
    name: 'response',
    description: 'Response from the remote url',
  })
  @IsString()
  readonly response?: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of webhook error creation","read_only":true}
  @Field({
    name: 'date_created',
    description: 'Date of webhook error creation',
  })
  @IsString()
  @IsDate()
  readonly dateCreated?: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last webhook error update","read_only":true}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last webhook error update',
  })
  @IsString()
  @IsDate()
  readonly dateLastModified?: Date
}
