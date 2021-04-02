import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Hello {
  @Field((type) => Int)
  id: number

  @Field((type) => String)
  message: string
}
