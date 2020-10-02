import { IsString, IsBoolean, IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StripeAddress } from 'src/stripe/dto/stripe-address.dto';
import { StripeShippingAddress } from 'src/stripe/dto/stripe-shipping-address.dto';

export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsBoolean()
    readonly seller: boolean;

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
    readonly phone: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => StripeShippingAddress)
    readonly shipping?: StripeShippingAddress;

    @IsOptional()
    @IsString()
    readonly paymentMethod?: string;
}
