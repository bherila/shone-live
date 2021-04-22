/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<HPktzffz71756AKpLD87LV/001RoT2v0>>
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
export class CreateEntBrandDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"name of the brand"}
  @Field({
    name: 'brand_name',
    description: 'name of the brand',
  })
  @IsString()
  readonly brandName?: string

  // Gen from: {"type":"string","description":"URL to the brand's website"}
  @Field({
    name: 'brand_url',
    description: "URL to the brand's website",
  })
  @IsString()
  readonly brandUrl?: string

  // Gen from: {"type":"string","description":"URL to the brand instagram page"}
  @Field({
    name: 'brand_ig_url',
    description: 'URL to the brand instagram page',
  })
  @IsString()
  readonly brandIgUrl?: string

  // Gen from: {"type":"string","description":"URL to the brand facebook page"}
  @Field({
    name: 'brand_fb_url',
    description: 'URL to the brand facebook page',
  })
  @IsString()
  readonly brandFbUrl?: string
}
