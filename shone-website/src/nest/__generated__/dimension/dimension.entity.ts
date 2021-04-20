/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Icu/DkJhslAllaX5OYJfgHn+bufzxEPz>>
 */

import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity({ name: 'dimension' })
export class Dimension {
  @Field({
    name: 'ent_id',
    description: 'Global unique ID for this entity (within SHONE)',
  })
  @PrimaryGeneratedColumn('uuid')
  readonly entId: string

  @Field({ name: 'ent_created', description: 'Date this entity was created' })
  @CreateDateColumn({
    name: 'ent_created',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  readonly entCreated: Date

  @Field({ name: 'ent_updated', description: 'Date this entity was updated' })
  @UpdateDateColumn({
    name: 'ent_updated',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  readonly entUpdated: Date

  /* BEGIN MANUAL SECTION CUSTOM_PROPERTIES */
  // Add any custom properties you need
  /* END MANUAL SECTION */

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'bigint',
  })
  id: number

  // Gen from: {"type":"integer","format":"int64","description":"Sku ID"}
  @Field({
    name: 'sku_id',
    description: 'Sku ID',
  })
  @Column({
    name: 'sku_id',
    type: 'bigint',
  })
  skuId: number

  // Gen from: {"type":"string","description":"What's being measured","enum":["height","weight","width","depth"]}
  @Field({
    name: 'measure',
    description: "What's being measured",
  })
  @Column({
    name: 'measure',
    type: 'text',
  })
  measure: string

  // Gen from: {"type":"string","description":"Type of Measurement","enum":["product","shipping"]}
  @Field({
    name: 'type',
    description: 'Type of Measurement',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"string","description":"Unit of Measure","enum":["inches","feet","centimeters","ounces","pounds","grams","kilograms"]}
  @Field({
    name: 'unit_of_measure',
    description: 'Unit of Measure',
  })
  @Column({
    name: 'unit_of_measure',
    type: 'text',
  })
  unitOfMeasure: string

  // Gen from: {"type":"number","format":"double","description":"Value"}
  @Field({
    name: 'value',
    description: 'Value',
  })
  @Column({
    name: 'value',
  })
  value: number
}
