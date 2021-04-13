import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { ConsumerLeadsService } from './consumer-leads.service'
import { ConsumerLead } from './entities/consumer-lead.entity'

@Resolver(() => ConsumerLead)
export class ConsumerLeadsResolver {
  constructor(private readonly consumerLeadsService: ConsumerLeadsService) {}

  @Query(() => ConsumerLead, { nullable: true })
  consumerLead(@Args('showId') showId: number) {
    return this.consumerLeadsService.findOne(showId)
  }

  @Query(() => [ConsumerLead])
  consumerLeads(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ConsumerLead[]> {
    return this.consumerLeadsService.findAll(paginationQuery)
  }

  @Mutation(() => ConsumerLead)
  async addConsumerLead(@Args('email') email: string) {
    return await this.consumerLeadsService.create({
      email,
    })
  }
}
