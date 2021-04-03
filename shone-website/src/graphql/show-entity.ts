import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

/* 
  # Query for the list of shows
  query {
      shows {
          id
          title
          image_url
          start_date
          end_date
      }
  }
*/

@ObjectType()
@Entity()
export class Show {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column()
  title: string

  @Field({
    name: 'image_url',
  })
  @Column({
    name: 'image_url',
  })
  imageUrl: string

  @Field({ name: 'start_date' })
  @Column({ name: 'start_date' })
  startDate: Date

  @Field({ name: 'end_date' })
  @Column({ name: 'end_date' })
  endDate: Date
}
