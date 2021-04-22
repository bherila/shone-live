/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<uiOiqtauD7zOJIC/r6FcCs1YgUQVvXf6>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { WebhookHeadersService } from './webhook-header.service'
import { WebhookHeader } from './webhook-header.entity'

@Resolver(() => WebhookHeader)
export class WebhookHeadersResolver {
  constructor(private readonly WebhookHeadersService: WebhookHeadersService) {}

  @Query(() => WebhookHeader, { nullable: true })
  webhookHeaderEntId(
    @Args('webhookHeaderEntId') webhookHeaderEntId: string /* UUID */,
  ) {
    return this.WebhookHeadersService.getByEntId(webhookHeaderEntId)
  }

  @Query(() => [WebhookHeader])
  webhookHeaders(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<WebhookHeader[]> {
    return this.WebhookHeadersService.findAll(paginationQuery)
  }

  // @Mutation(() => WebhookHeader)
  // async addWebhookHeader(@Args('email') email: string) {
  //   return await this.WebhookHeadersService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
