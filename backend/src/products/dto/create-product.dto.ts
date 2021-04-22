import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateProductDto {
  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  readonly showSegmentId: string

  @IsOptional()
  @Field({ nullable: true })
  @IsString()
  readonly brandId: string

  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly description: string
}
