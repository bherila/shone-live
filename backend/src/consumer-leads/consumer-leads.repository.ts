import { EntityRepository, Repository } from 'typeorm'

import { ConsumerLead } from './entities/consumer-lead.entity'

@EntityRepository(ConsumerLead)
export class ConsumerLeadsRepository extends Repository<ConsumerLead> {}
