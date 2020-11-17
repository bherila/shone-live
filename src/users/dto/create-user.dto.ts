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
  })
  @IsOptional()
  @IsString()
  readonly username?: string;

  @ApiProperty({
    description: `used for various authorizations sellers must be validated`,
  })
  @IsOptional()
  @IsBoolean()
  readonly seller?: boolean;

  @ApiProperty({
    description: `full address object
    can be passed on creation
    is the home address of the user`,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StripeAddress)
  readonly address?: StripeAddress;

  @ApiProperty({
    description: `email used for unique user identification`,
  })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({
    description: `users first name`,
  })
  @IsOptional()
  @IsString()
  readonly first_name?: string;

  @ApiProperty({
    description: `users last name`,
  })
  @IsOptional()
  @IsString()
  readonly last_name?: string;

  @ApiProperty({
    description: `users phone number`,
  })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('US')
  readonly phone?: string;

  @ApiProperty({
    description: `full address object
    can be passed on creation
    is the shipping address as saved in Stripe of the user`,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StripeShippingAddress)
  readonly shipping?: StripeShippingAddress;

  // TODO Check if deprecated and remove
  // card creation happens after user creation and
  // card gets associated with user separately so probably remove this
  @ApiProperty({
    description: `this is the id of a stripe credit card for now`,
  })
  @IsOptional()
  @IsString()
  readonly paymentMethod?: string;
}
