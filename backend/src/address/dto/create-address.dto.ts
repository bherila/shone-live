import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateAddressDto {
  @Field()
  @IsString()
  userId: string

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
  postalCode: string

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
