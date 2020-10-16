import { IsString, IsOptional } from 'class-validator';

export class StripeShippingAddress {
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
