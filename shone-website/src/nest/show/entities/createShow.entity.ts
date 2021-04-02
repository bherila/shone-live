import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateShowInput {
  @Field() title: string
  @Field() imageurl: string
  @Field() startDate: Date
  @Field() endDate: Date
}
