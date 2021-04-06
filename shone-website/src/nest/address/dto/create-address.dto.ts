import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateAddressDto {
  @Field()
  @IsString()
  user_id: string

  @Field()
  @IsString()
  city: string

  @Field()
  @IsString()
  country: string

  @Field()
  @IsString()
  line1: string

  @Field()
  @IsOptional()
  @IsString()
  line2?: string

  @Field()
  @IsString()
  postal_code: string

  @Field()
  @IsString()
  state: string

  @Field()
  @IsOptional()
  @IsString()
  name?: string

  @Field()
  @IsOptional()
  @IsString()
  phone?: string
}
