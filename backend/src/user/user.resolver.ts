import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { UpdateUserEntityDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User, { nullable: true })
  user(@Args('userId') userId: string) {
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
      throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST)
    }
  }

  @Query(() => User)
  verify_code(@Args('phone') phone: string, @Args('code') code: string) {
    return this.usersService.verifySmsCode(phone, code)
  }

  @Mutation(() => User)
  async update_user(@Args('user') user: UpdateUserEntityDto) {
    const file = user.file
    if (file) {
      if (file.mimetype === ('image/jpeg' || 'image/jpg' || 'image/png'))
        return Error('Please Upload only jpeg,png,jpg images')
      user = {
        ...user,
        file,
      }
    }
    return await this.usersService.update(user)
  }
}
