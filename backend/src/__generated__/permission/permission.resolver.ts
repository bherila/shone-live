/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<2G/JhZkrlloRKvOYI23+B9fjmMoFclb3>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { PermissionsService } from './permission.service'
import { Permission } from './permission.entity'

@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly PermissionsService: PermissionsService) {}

  @Query(() => Permission, { nullable: true })
  permissionEntId(@Args('permissionEntId') permissionEntId: string /* UUID */) {
    return this.PermissionsService.getByEntId(permissionEntId)
  }

  @Query(() => [Permission])
  permissions(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Permission[]> {
    return this.PermissionsService.findAll(paginationQuery)
  }

  // @Mutation(() => Permission)
  // async addPermission(@Args('email') email: string) {
  //   return await this.PermissionsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
