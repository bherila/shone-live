import { EntityRepository, Repository } from 'typeorm'

import { PaymentMethodEntity } from './entities/payment-method-entity'

@EntityRepository(PaymentMethodEntity)
export class PaymentMethodRepository extends Repository<PaymentMethodEntity> {}
