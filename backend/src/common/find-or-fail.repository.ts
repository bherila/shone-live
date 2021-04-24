import { NotFoundException } from '@nestjs/common'
import { FindOneOptions, Repository } from 'typeorm'

export class FindOrFailRepository<T> extends Repository<T> {
  entityName = ''
  async findOrFail(id: string, options?: FindOneOptions) {
    const record = await this.findOne(id, options)
    if (!record) {
      throw new NotFoundException(`${this.entityName} #${id} not found`)
    }
    return record
  }
}
