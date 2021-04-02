import { Injectable } from '@nestjs/common'
import { Hello } from './models/hello.model'
import { Field, InputType, ArgsType, Int } from '@nestjs/graphql'
import { Max, Min, MaxLength } from 'class-validator'

@Injectable()
export class HelloService {
  // For DEMO ONLY we use an array, normally we'd use the database.
  private staticData: Hello[] = [
    {
      id: 1,
      message: 'Hello world!',
    },
  ]

  async create(data: HelloInput): Promise<Hello> {
    this.staticData.push({
      id: this.staticData.length + 1,
      ...data,
    })
    return data as any
  }

  async findOneById(id: number): Promise<Hello> {
    return this.staticData.find((x) => x.id === id)
  }

  async findAll(args: HelloArgs): Promise<Hello[]> {
    return this.staticData as Hello[]
  }

  async remove(id: number): Promise<boolean> {
    this.staticData = this.staticData.filter((x) => x.id !== id)
    return true
  }
}

@ArgsType()
export class HelloArgs {
  @Field((type) => Int)
  @Min(0)
  skip = 0

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take = 25
}

@InputType()
export class HelloInput {
  @Field()
  @MaxLength(30)
  message: string

  // @Field( {nullable: true} )
  // @IsOptional()
  // @Length( 30, 255 )
  // description?: string;
  //
  // @Field( type => [String] )
  // ingredients: string[];
}