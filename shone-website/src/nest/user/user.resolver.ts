import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { User } from './entities/user.entity'
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
    console.log(`user`, user)
    return this.usersService.findAll()
  }

  @Mutation(() => String)
  addUser(@Args('phone') phone: string) {
    try {
      return this.usersService.create(phone)
    } catch (error) {
      console.log(`error`, error)
      throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST)
    }
  }

  @Query(() => User)
  verifyCode(@Args('phone') phone: string, @Args('code') code: string) {
    return this.usersService.verifySmsCode(phone, code)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('userId') userId: string,
  ) {
    return this.usersService.update(userId, email, username)
  }
}
