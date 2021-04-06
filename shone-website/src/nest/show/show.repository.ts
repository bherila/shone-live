import { EntityRepository, Repository } from 'typeorm'

import { Show } from './entities/show.entity'

@EntityRepository(Show)
export class ShowRepository extends Repository<Show> {}
