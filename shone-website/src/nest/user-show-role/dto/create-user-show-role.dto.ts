import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsString } from 'class-validator'

@InputType()
export class CreateUserShowRoleDto {
  @Field()
  @IsString()
  readonly showId: string

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
