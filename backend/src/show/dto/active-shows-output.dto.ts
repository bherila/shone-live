import { Field, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@ObjectType()
export class ActiveShowsOutputDto {
  @Field()
  @IsString()
  msg: string
}
