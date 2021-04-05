import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateShowInput {
  @Field() title: string
  @Field({ nullable: true }) imageurl: string
  @Field() startDate: Date
  @Field() endDate: Date
}
