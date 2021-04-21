import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { GraphQLUpload } from 'apollo-server-express'
import { IsOptional, IsString } from 'class-validator'
import { FileUpload } from 'graphql-upload'

@InputType()
export class UpdateUserEntityDto {
  @IsString()
  @Field()
  id: string

  @IsOptional()
  @Field({ nullable: true })
  username: string

  @IsOptional()
  @Field({ nullable: true })
  email: string

  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  file: FileUpload
}
