import { DEFINITIONS_KEY, ObjectDefinition, Property } from './interfaces'

export class EntSchema implements ObjectDefinition {
  constructor(readonly type: string) {
    this.properties = {}
  }
  properties: Record<string, Property>

  intProp(name: string, description?: string): EntSchema {
    this.properties[name] = {
      type: 'integer',
      description,
      format: 'int32',
    }
    return this
  }

  stringProp(name: string, description?: string): EntSchema {
    this.properties[name] = {
      type: 'string',
      description,
    }
    return this
  }

  ownedByUser(): EntSchema {
    return this.parentRef('owner_user', DEFINITIONS_KEY + 'User', true)
  }

  parentRef(
    name: string,
    refTypeName: string,
    dtoExclude?: boolean,
  ): EntSchema {
    this.properties[name] = {
      type: '',
      $ref: DEFINITIONS_KEY + refTypeName,
      dtoExclude,
    }
    return this
  }
}
