import { Field, InputType } from '@nestjs/graphql'
import { Column } from 'typeorm'

@InputType()
export class CreateShowInput {
  @Field() title: string
  @Field({ nullable: true, name: 'image_url' })
  @Column({ nullable: true, name: 'image_url' })
  imageUrl: string
  @Field() startDate: Date
  @Field() endDate: Date
}
