import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateUserBrandRoleDto } from './dto/create-user-brand-role.dto'
import { UpdateUserBrandRoleDto } from './dto/update-user-brand-role.dto'
import { UserBrandRole } from './entities/user-brand-role.entity'
import { UserBrandRolesService } from './user-brand-roles.service'

@Resolver(() => UserBrandRole)
export class UserBrandRoleResolver {
  constructor(private readonly userbrandrolesService: UserBrandRolesService) {}

  @Query(() => UserBrandRole, { nullable: true })
  userbrandrole(@Args('userbrandroleId') userbrandroleId: string) {
    return this.userbrandrolesService.findOne(userbrandroleId)
  }

  @Query(() => [UserBrandRole])
  userbrandroles(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<UserBrandRole[]> {
    return this.userbrandrolesService.findAll(paginationQuery)
  }

  @Query(() => [UserBrandRole])
  @UseGuards(new AuthGuard())
  my_userbrandroles(
    @Context('user') user,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<UserBrandRole[]> {
    return this.userbrandrolesService.findByUser(paginationQuery, user.id)
  }

  @Mutation(() => UserBrandRole)
  @UseGuards(new AuthGuard())
  async add_userbrandrole(
    @Context('user') user,
    @Args('data') data: CreateUserBrandRoleDto,
  ) {
    return await this.userbrandrolesService.create(data, user.id)
  }

  @Mutation(() => UserBrandRole)
  @UseGuards(new AuthGuard())
  async update_userbrandrole(@Args('data') data: UpdateUserBrandRoleDto) {
    return await this.userbrandrolesService.update(data)
  }
}
