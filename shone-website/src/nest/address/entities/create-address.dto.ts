import { IsOptional, IsString } from 'class-validator'

export class CreateAddressDto {
  @IsString()
  user_id: string

  @IsString()
  city: string

  @IsString()
  country: string

  @IsString()
  line1: string

  @IsOptional()
  @IsString()
  line2?: string

  @IsString()
  postal_code: string

  @IsString()
  state: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  phone?: string
}
