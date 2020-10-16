import { IsOptional, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { StripeAddress } from './stripe-address.dto';
import { isString } from 'util';

export class CreateStripeCardDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => StripeAddress)
  readonly address?: StripeAddress;

  @IsString()
  readonly customer: string; // the customer id

  @IsString()
  readonly object: string; // should always be card in our case

  @IsString()
  readonly number: string; // the card number

  @IsString()
  readonly exp_month: number; // two digit number of expiration month

  @IsString()
  readonly exp_year: number; // two digit number of expiration year
}
