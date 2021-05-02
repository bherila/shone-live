import { Field, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ObjectType()
export class DeleteAddessOutputDto {
  @Field()
  @IsString()
  msg: string
}
