import { IsString, IsOptional } from "class-validator";

export class CreateAddressDto {
    @IsOptional()
    @IsString()
    user?: string; // id of the user // should switch to be userId

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

    @IsOptional()
    @IsString()
    name?: string; // customer name

    @IsOptional()
    @IsString()
    phone?: string; // customer phone
}
