import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateUserShowRoleDto {
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
