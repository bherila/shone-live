import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateUserBrandRoleDto {
  @Field()
  @IsString()
  readonly id: string

  @Field()
  @IsString()
  readonly name: string

  @Field()
  @IsString()
  readonly description: string
}
