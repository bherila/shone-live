import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from './user-entity'

@Service()
@Resolver((of) => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query((returns) => User, { nullable: true })
  user(@Arg('userId', (type) => Int) userId: number) {
    return this.userRepository.findOne(userId)
  }

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userRepository.find()
  }

  // TODO: Implement add user here.
  // @Mutation((returns) => User)
  // async addUser(
  //   @Arg('user') userInput: UserInput,
  //   @Ctx() { user }: Context,
  // ): Promise<User> {
  //   const user = this.userRepository.create({
  //     ...userInput,
  //     authorId: user.id,
  //   })
  //   return await this.userRepository.save(user)
  // }
}
