import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator'

@InputType()
export class PaginationQueryDto {
  @Field()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  limit?: number

  @Field()
  @IsOptional()
  @Min(0)
  @IsNumber()
  offset?: number
}
