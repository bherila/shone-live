/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<y7wNUS6IJY0piEOGJvub1fV9dpTA+3r2>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Role } from './role.entity'
import { RolesService } from './role.service'

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly RolesService: RolesService) {}

  @Query(() => Role, { nullable: true })
  roleEntId(@Args('roleEntId') roleEntId: string /* UUID */) {
    return this.RolesService.getByEntId(roleEntId)
  }

  @Query(() => [Role])
  roles(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Role[]> {
    return this.RolesService.findAll(paginationQuery)
  }

  // @Mutation(() => Role)
  // async addRole(@Args('email') email: string) {
  //   return await this.RolesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
