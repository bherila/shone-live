import { Type } from 'class-transformer';
import * as ClassValidator from 'class-validator';
import { StripeAddress } from 'src/stripe/dto/stripe-address.dto';

export class CreatePaymentMethodDto {
  @ClassValidator.IsString()
  readonly user: string; // id of the user

  // TODO: check why address is optional on card? do we auto-fill from somewhere? I think it should need to be passed explicitly
  @ClassValidator.IsOptional()
  @ClassValidator.ValidateNested()
  @Type(() => StripeAddress)
  readonly address?: StripeAddress;

  // just hardcoded for now, can decide later if should make client pass explicitly
  // @IsString()
  // object: string; // should be card

  @ClassValidator.IsOptional()
  @ClassValidator.IsString()
  name?: string; // card number

  @ClassValidator.IsString()
  number: string; // card number

  @ClassValidator.IsNumber()
  exp_month: number; // Two-digit number representing the card's expiration month.

  @ClassValidator.IsNumber()
  exp_year: number; // Two- or four-digit number representing the card's expiration year.

  @ClassValidator.IsString()
  cvc: string; // Card security code. Highly recommended to always include this value, but it's required only for accounts based in European countries.
}
