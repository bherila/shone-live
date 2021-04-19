import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Hello {
  @Field(() => Int)
  id: string

  @Field(() => String)
  message: string
}
