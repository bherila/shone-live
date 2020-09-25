import { Type } from "class-transformer";
import { IsOptional, IsString, IsNumber, ValidateNested, IsNotEmpty } from "class-validator";
import { StripeAddress } from "src/stripe/dto/stripe-address.dto";

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
    card: string; //id

    @IsString()
    user: string; //id
}
