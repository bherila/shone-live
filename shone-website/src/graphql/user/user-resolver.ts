import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User, UserWithToken } from './user-entity'
import { UserService } from './user-service'
@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UserService,
  ) {}

  @Query(() => User, { nullable: true })
  user(@Arg('userId', () => Int) userId: number) {
    return this.userRepository.findOne(userId)
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userRepository.find()
  }

  @Mutation(() => User)
  async addUser(@Arg('phone') phone: string) {
    const code = Math.floor(1000 + Math.random() * 9000)
    await this.usersService.sendVerificationCode(phone, code)
    return await this.usersService.create(phone, code)
  }

  @Query(() => UserWithToken)
  async verifyCode(@Arg('userId') userId: number, @Arg('code') code: number) {
    return this.usersService.verifycode(userId, code)
  }
}
