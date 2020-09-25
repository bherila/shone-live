import { IsString, IsOptional } from "class-validator";

export class StripeAddress {
    @IsString()
    city: string;

    @IsString()
    country: string;

    @IsString()
    line1: string;

    @IsOptional()
    @IsString()
    line2?: string;

    @IsString()
    postal_code: string;

    @IsString()
    state: string;
}
