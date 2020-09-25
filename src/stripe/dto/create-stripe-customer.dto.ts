import { IsString, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { StripeAddress } from "./stripe-address.dto";
import { StripeShippingAddress } from "./stripe-shipping-address.dto";

export class CreateStripeCustomerDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => StripeAddress)
    readonly address?: StripeAddress;

    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsString()
    readonly first_name: string;

    @IsString()
    readonly last_name: string;

    @IsString()
    @IsOptional()
    readonly phone?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => StripeShippingAddress)
    readonly shipping?: StripeShippingAddress;

    @IsOptional()
    @IsString()
    readonly paymentMethod?: string; // returns as default source from stripe
}
