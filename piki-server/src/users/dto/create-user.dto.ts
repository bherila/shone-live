import { Type } from 'class-transformer';
import {
  IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString, ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { StripeAddress } from '../../stripe/dto/stripe-address.dto';
import {
  StripeShippingAddress,
} from '../../stripe/dto/stripe-shipping-address.dto';

export class CreateUserDto {
  @ApiProperty({
    description: `display username for use in the app.
    must be unique across users`,
    example: `my_username_without_spaces`,
  })
  @IsOptional()
  @IsString()
  readonly username?: string;

  @ApiProperty({
    description:
      `descriptive bio for use in the app. ` +
      `target is for sellers to describe themselves`,
    example:
      `My obsession with plants began deep in ` +
      `the Amazon rainforest 20 years ago.` +
      `Since then I've been selling some of the worlds most rare orchids.`,
  })
  @IsOptional()
  @IsString()
  readonly bio?: string;

  @ApiProperty({
    description: `used for various authorizations sellers must be validated`,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly seller?: boolean;

  @ApiProperty({
    description: `full address object
    can be passed on creation
    is the home address of the user`,
    example: {
      city: 'New York',
      country: 'US',
      line1: '1 Broadway',
      line2: 'Suite 1000',
      postal_code: '10004',
      state: 'NY',
    },
    type: StripeAddress,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StripeAddress)
  readonly address?: StripeAddress;

  @ApiProperty({
    description: `email used for unique user identification`,
    example: 'myemail@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: `users first name`,
    example: 'John',
  })
  @IsOptional()
  @IsString()
  readonly first_name?: string;

  @ApiProperty({
    description: `users last name`,
    example: 'Smith',
  })
  @IsOptional()
  @IsString()
  readonly last_name?: string;

  @ApiProperty({
    description: `users phone number`,
    example: '555-555-1234',
  })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('US')
  readonly phone?: string;

  @ApiProperty({
    description: `full address object
    can be passed on creation
    is the shipping address as saved in Stripe of the user`,
    example: {
      city: 'New York',
      country: 'US',
      line1: '1 Broadway',
      line2: 'Suite 1000',
      postal_code: '10004',
      state: 'NY',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StripeShippingAddress)
  readonly shipping?: StripeShippingAddress;
}
