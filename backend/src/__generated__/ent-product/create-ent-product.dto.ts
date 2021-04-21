/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<et+1DJ83qyEIYdrDhLoeu31L25ZnjNo7>>
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
export class CreateEntProductDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string"}
  @Field({
    name: 'product_name',
  })
  @IsString()
  readonly productName?: string
}
