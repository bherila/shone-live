/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<5UrEW482ZrpqldcLsaDTzEcPuO8/iTqz>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { WebhookError } from './webhook-error.entity'
import { WebhookErrorsService } from './webhook-error.service'

@Resolver(() => WebhookError)
export class WebhookErrorsResolver {
  constructor(private readonly WebhookErrorsService: WebhookErrorsService) {}

  @Query(() => WebhookError, { nullable: true })
  webhookErrorEntId(
    @Args('webhookErrorEntId') webhookErrorEntId: string /* UUID */,
  ) {
    return this.WebhookErrorsService.getByEntId(webhookErrorEntId)
  }

  @Query(() => [WebhookError])
  webhookErrors(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<WebhookError[]> {
    return this.WebhookErrorsService.findAll(paginationQuery)
  }

  // @Mutation(() => WebhookError)
  // async addWebhookError(@Args('email') email: string) {
  //   return await this.WebhookErrorsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
