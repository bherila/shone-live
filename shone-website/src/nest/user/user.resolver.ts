import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

import { User, UserWithToken } from './entities/user.entity'
import { UserService } from './user.service'
@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User, { nullable: true })
  user(@Arg('userId', () => Int) userId: number) {
    return this.usersService.findOne(userId)
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Mutation(() => User)
  async addUser(@Arg('phone') phone: string) {
    const code = Math.floor(1000 + Math.random() * 9000)
    await this.usersService.sendVerificationCode(phone, code)
    return await this.usersService.create(phone, code)
  }

  @Query(() => UserWithToken)
  async verifyCode(@Arg('userId') userId: number, @Arg('code') code: number) {
    return this.usersService.verifySmsCode(userId, code)
  }
}
