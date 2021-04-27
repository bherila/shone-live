import { NotFoundException } from '@nestjs/common'
import { FindOneOptions, In, Repository } from 'typeorm'

export class FindOrFailRepository<T> extends Repository<T> {
  entityName = ''
  async findOrFail(id: string, options?: FindOneOptions) {
    const record = await this.findOne(id, options)
    if (!record) {
      throw new NotFoundException(`${this.entityName} #${id} not found`)
    }
    return record
  }
  async findAllOrFail(ids: string[], options?: any) {
    const record = await this.find({
      where: { id: In(ids) },
      ...options,
    })
    if (record.length !== ids.length) {
      throw new NotFoundException(`some ${this.entityName} not found`)
    }
    return record
  }
}
