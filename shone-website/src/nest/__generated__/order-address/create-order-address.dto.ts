/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<xu9hCQXcZ0GyVzsBBET2PKzCI9IvcaKc>>
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
export class CreateOrderAddressDto {
  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"string","description":"Name on Address"}
  @Field({
    name: 'name',
    description: 'Name on Address',
  })
  @IsString()
  readonly name?: string

  // Gen from: {"type":"string","description":"City"}
  @Field({
    name: 'city',
    description: 'City',
  })
  @IsString()
  readonly city?: string

  // Gen from: {"type":"string","description":"State Abbreviation"}
  @Field({
    name: 'state',
    description: 'State Abbreviation',
  })
  @IsString()
  readonly state?: string

  // Gen from: {"type":"string","description":"Country ISO2 Code"}
  @Field({
    name: 'country',
    description: 'Country ISO2 Code',
  })
  @IsString()
  readonly country?: string

  // Gen from: {"type":"string","description":"Postal/Zip Code"}
  @Field({
    name: 'postal_code',
    description: 'Postal/Zip Code',
  })
  @IsString()
  readonly postalCode?: string

  // Gen from: {"type":"string","description":"Phone Number"}
  @Field({
    name: 'phone',
    description: 'Phone Number',
  })
  @IsString()
  readonly phone?: string

  // Gen from: {"type":"string","description":"Address Type","enum":["shipping","billing"]}
  @Field({
    name: 'type',
    description: 'Address Type',
  })
  @IsString()
  readonly type?: string

  // Gen from: {"type":"string","description":"First line of the Address"}
  @Field({
    name: 'address_1',
    description: 'First line of the Address',
  })
  @IsString()
  readonly address_1?: string

  // Gen from: {"type":"string","description":"Second line of the Address"}
  @Field({
    name: 'address_2',
    description: 'Second line of the Address',
  })
  @IsString()
  readonly address_2?: string
}
