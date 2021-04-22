import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsString } from 'class-validator'

@InputType()
export class UpdateUserBrandRoleDto {
  @Field()
  @IsString()
  readonly id: string

  @Field()
  @IsBoolean()
  read: boolean

  @Field()
  @IsBoolean()
  write: boolean

  @Field()
  @IsBoolean()
  admin: boolean
}
