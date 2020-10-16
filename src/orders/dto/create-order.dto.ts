import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, isString } from "class-validator";

import { StripeAddress } from "src/stripe/dto/stripe-address.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {
    @IsNumber()
    quantity: number; // the total quantity of the one sku, will need hash once multiple SKUs supported

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => StripeAddress)
    readonly shipping: StripeAddress;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    shipping_name: string;

    @IsString()
    sku: string; //id, right now only one SKU at a time

    @IsOptional()
    files: string[]; // array of file links

    @IsString()
    card: string; //id TODO: rename to cardId

    @IsString()
    user: string; //id TODO: rename to userId

    @IsNumber()
    showId: number;
}
