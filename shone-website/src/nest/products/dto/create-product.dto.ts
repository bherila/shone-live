import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreateProductDto {
  @Field({ nullable: true })
  @IsString()
  readonly showSegmentId: string

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
