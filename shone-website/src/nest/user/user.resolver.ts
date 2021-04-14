import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLUpload } from 'apollo-server-express'
import { FileUpload } from 'graphql-upload'

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
  add_user(@Args('phone') phone: string) {
    try {
      return this.usersService.create(phone)
    } catch (error) {
      console.log(`error`, error)
      throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST)
    }
  }

  @Query(() => User)
  verify_code(@Args('phone') phone: string, @Args('code') code: string) {
    return this.usersService.verifySmsCode(phone, code)
  }

  @Mutation(() => User)
  async update_user(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('userId') userId: string,
  ) {
    if (file.mimetype === ('image/jpeg' || 'image/jpg' || 'image/png')) {
      return await this.usersService.update(userId, email, username, file)
    } else return Error('Please Upload only jpeg,png,jpg images')
  }
}
