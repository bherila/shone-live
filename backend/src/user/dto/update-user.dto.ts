import { Field, InputType } from '@nestjs/graphql'
import { GraphQLUpload } from 'apollo-server-express'
import { IsOptional, IsString } from 'class-validator'
import { FileUpload } from 'graphql-upload'

@InputType({
  description:
    'DTO to update a User, this is only the fields possible for the user to self-update',
})
export class UpdateUserEntityDto {
  @Field({ nullable: true })
  @IsString()
  username: string

  @IsOptional()
  @Field({ nullable: true })
  email: string

  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  file: FileUpload

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  lastname: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  firstname: string
}
