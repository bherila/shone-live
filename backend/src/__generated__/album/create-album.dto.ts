/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<iJBKCvjliFARrvhs2OAuXYZfkPchBj61>>
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
export class CreateAlbumDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @IsInt()
  readonly id?: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the parent entity"}
  @Field({
    name: 'parent_id',
    description: 'ID of the parent entity',
  })
  @IsInt()
  readonly parentId?: number

  // Gen from: {"type":"string","description":"Parent Type","enum":["offer","sku"]}
  @Field({
    name: 'type',
    description: 'Parent Type',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"string","description":"Name of Album"}
  @Field({
    name: 'name',
    description: 'Name of Album',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"array","description":"Album media","unique_items":true,"items":{"$ref":"#/definitions/Media"}}
  @Field({
    name: 'media',
    description: 'Album media',
  })
  readonly media?: string
}
