/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ymdoriAYjxhsN0kpgnBYkUigwILb/zMa>>
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
export class CreateMediaDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int64","description":"Album ID"}
  @Field({
    name: 'album_id',
    description: 'Album ID',
  })
  @IsInt()
  readonly albumId?: number

  // Gen from: {"type":"string","description":"External ID"}
  @Field({
    name: 'external_id',
    description: 'External ID',
  })
  @IsString()
  readonly externalId?: string

  // Gen from: {"type":"string","description":"ID of hosted cloud entity"}
  @Field({
    name: 'cloud_id',
    description: 'ID of hosted cloud entity',
  })
  @IsString()
  readonly cloudId?: string

  // Gen from: {"type":"string","description":"Media URL"}
  @Field({
    name: 'url',
    description: 'Media URL',
  })
  @IsString()
  readonly url?: string

  // Gen from: {"type":"string","description":"Media Source URL"}
  @Field({
    name: 'source_url',
    description: 'Media Source URL',
  })
  @IsString()
  readonly sourceUrl?: string

  // Gen from: {"type":"string","description":"Media Type","enum":["image","video"]}
  @Field({
    name: 'type',
    description: 'Media Type',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"integer","format":"int32","description":"Display Order"}
  @Field({
    name: 'display_order',
    description: 'Display Order',
  })
  @IsInt()
  readonly displayOrder?: number

  // Gen from: {"type":"boolean","description":"Primary Media","default":false}
  @Field({
    name: 'primary_media',
    description: 'Primary Media',
  })
  readonly primaryMedia?: boolean
}
