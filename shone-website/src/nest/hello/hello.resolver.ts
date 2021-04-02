import { Hello } from './models/hello.model'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { NotFoundException } from '@nestjs/common'
import { HelloArgs, HelloInput, HelloService } from './hello.service'

@Resolver((of) => Hello)
export class HelloResolver {
  constructor(private readonly helloService: HelloService) {}

  @Query((returns) => Hello)
  async hello(@Args('id') id: number): Promise<Hello> {
    const hello = await this.helloService.findOneById(id)
    if (!hello) {
      throw new NotFoundException(id)
    }
    return hello
  }

  @Query((returns) => [Hello])
  hellos(@Args() helloArgs: HelloArgs): Promise<Hello[]> {
    return this.helloService.findAll(helloArgs)
  }

  @Mutation((returns) => Hello)
  async addHello(
    @Args('newHelloData') newHelloData: HelloInput,
  ): Promise<Hello> {
    const hello = await this.helloService.create(newHelloData)
    // pubSub.publish('helloAdded', { helloAdded: hello });
    return hello
  }

  @Mutation((returns) => Boolean)
  async removeHello(@Args('id') id: number) {
    return this.helloService.remove(id)
  }

  // @Subscription(returns => Hello)
  // helloAdded() {
  //   return pubSub.asyncIterator('helloAdded');
  // }
}
