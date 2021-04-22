import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateUserShowRoleDto } from './dto/create-user-show-role.dto'
import { UpdateUserShowRoleDto } from './dto/update-user-show-role.dto'
import { UserShowRole } from './entities/user-show-role.entity'
import { UserShowRolesService } from './user-show-roles.service'

@Resolver(() => UserShowRole)
export class UserShowRoleResolver {
  constructor(private readonly usershowrolesService: UserShowRolesService) {}

  @Query(() => UserShowRole, { nullable: true })
  usershowrole(@Args('usershowroleId') usershowroleId: string) {
    return this.usershowrolesService.findOne(usershowroleId)
  }

  @Query(() => [UserShowRole])
  usershowroles(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<UserShowRole[]> {
    return this.usershowrolesService.findAll(paginationQuery)
  }

  @Query(() => [UserShowRole])
  @UseGuards(new AuthGuard())
  my_usershowroles(
    @Context('user') user,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<UserShowRole[]> {
    return this.usershowrolesService.findByUser(paginationQuery, user.id)
  }

  @Mutation(() => UserShowRole)
  @UseGuards(new AuthGuard())
  async add_usershowrole(
    @Context('user') user,
    @Args('data') data: CreateUserShowRoleDto,
  ) {
    return await this.usershowrolesService.create(data, user.id)
  }

  @Mutation(() => UserShowRole)
  @UseGuards(new AuthGuard())
  async update_usershowrole(@Args('data') data: UpdateUserShowRoleDto) {
    return await this.usershowrolesService.update(data)
  }
}
