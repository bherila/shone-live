/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<oFoYOGrm15DjeWuwX1xe4c/sijfJdnTb>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { WebhooksService } from './webhook.service'
import { Webhook } from './webhook.entity'

@Resolver(() => Webhook)
export class WebhooksResolver {
  constructor(private readonly WebhooksService: WebhooksService) {}

  @Query(() => Webhook, { nullable: true })
  webhookEntId(@Args('webhookEntId') webhookEntId: string /* UUID */) {
    return this.WebhooksService.getByEntId(webhookEntId)
  }

  @Query(() => [Webhook])
  webhooks(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Webhook[]> {
    return this.WebhooksService.findAll(paginationQuery)
  }

  // @Mutation(() => Webhook)
  // async addWebhook(@Args('email') email: string) {
  //   return await this.WebhooksService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
