import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsString } from 'class-validator'

@InputType()
export class CreateUserBrandRoleDto {
  @Field()
  @IsString()
  readonly brandId: string

  @Field()
  @IsString()
  readonly userId: string

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
