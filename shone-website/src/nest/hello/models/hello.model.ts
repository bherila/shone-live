import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Hello {
  @Field(() => Int)
  id: number

  @Field(() => String)
  message: string
}
