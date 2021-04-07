import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { newUser } from './dto/newUserDto'
import { User, UserWithToken } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User, { nullable: true })
  user(@Args('userId') userId: number) {
    return this.usersService.findOne(userId)
  }

  @Query(() => [User])
  @UseGuards(new AuthGuard())
  users(@Context('user') user: User): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Mutation(() => newUser)
  async addUser(@Args('phone') phone: string) {
    const code = Math.floor(Math.random() * 999999)
      .toString()
      .padStart(6, '0')
    await this.usersService.sendVerificationCode(phone, code)
    return await this.usersService.create(phone, code)
  }

  @Query(() => UserWithToken)
  async verifyCode(@Args('userId') userId: number, @Args('code') code: string) {
    return this.usersService.verifySmsCode(userId, code)
  }
}
