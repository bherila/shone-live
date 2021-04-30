// export interfaces
export const DEFINITIONS_KEY = '#/definitions/'

export interface ObjectDefinition {
  type: string
  properties: Record<string, Property>
}

export interface StringProperty {
  type: 'string' | 'array'
  min_length?: number
  max_length?: number
  pattern?: string
  description?: string
  format?: string
  dtoExclude?: boolean
}

export interface RefProperty {
  type: ''
  $ref: string
  description?: string
  dtoExclude?: boolean
}

export interface OtherProperty {
  type: 'integer'
  format?: string
  default?: boolean
  items?: Record<string, string>
  description?: string
  dtoExclude?: boolean
}

export type Property = StringProperty | OtherProperty | RefProperty
