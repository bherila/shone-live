import { IsString, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { StripeAddress } from "src/stripe/dto/stripe-address.dto";

export class CreatePaymentMethodDto {
    @IsString()
    readonly user: string; // id of the user

    // TODO: check why address is optional on card? do we auto-fill from somewhere? I think it should need to be passed explicitly
    @IsOptional()
    @ValidateNested()
    @Type(() => StripeAddress)
    readonly address?: StripeAddress;

    // just hardcoded for now, can decide later if should make client pass explicitly
    // @IsString()
    // object: string; // should be card

    @IsOptional()
    @IsString()
    name?: string; // card number

    @IsString()
    number: string; // card number

    @IsNumber()
    exp_month: number; // Two-digit number representing the card's expiration month.

    @IsNumber()
    exp_year: number; // Two- or four-digit number representing the card's expiration year.

    @IsString()
    cvc: string; // Card security code. Highly recommended to always include this value, but it's required only for accounts based in European countries.
}
