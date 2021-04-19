import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { HelloArgs, HelloInput, HelloService } from './hello.service'
import { Hello } from './models/hello.model'

@Resolver(() => Hello)
export class HelloResolver {
  constructor(private readonly helloService: HelloService) {}

  @Query(() => Hello)
  async hello(@Args('id') id: string): Promise<Hello> {
    const hello = await this.helloService.findOneById(id)
    if (!hello) {
      throw new NotFoundException(id)
    }
    return hello
  }

  @Query(() => [Hello])
  hellos(@Args() helloArgs: HelloArgs): Promise<Hello[]> {
    return this.helloService.findAll()
  }

  @Mutation(() => Hello)
  async addHello(
    @Args('newHelloData') newHelloData: HelloInput,
  ): Promise<Hello> {
    const hello = await this.helloService.create(newHelloData)
    // pubSub.publish('helloAdded', { helloAdded: hello });
    return hello
  }

  @Mutation(() => Boolean)
  async removeHello(@Args('id') id: string) {
    return this.helloService.remove(id)
  }

  // @Subscription(returns => Hello)
  // helloAdded() {
  //   return pubSub.asyncIterator('helloAdded');
  // }
}
