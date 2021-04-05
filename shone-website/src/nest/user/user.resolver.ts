import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Service } from 'typedi'

import { newUser } from './dto/newUserDto'
import { User, UserWithToken } from './entities/user.entity'
import { UserService } from './user.service'
@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User, { nullable: true })
  user(@Args('userId') userId: number) {
    return this.usersService.findOne(userId)
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Mutation(() => newUser)
  async addUser(@Args('phone') phone: string) {
    const code = Math.floor(1000 + Math.random() * 9000)
    await this.usersService.sendVerificationCode(phone, code)
    return await this.usersService.create(phone, code)
  }

  @Query(() => UserWithToken)
  async verifyCode(@Args('userId') userId: number, @Args('code') code: number) {
    return this.usersService.verifySmsCode(userId, code)
  }
}
