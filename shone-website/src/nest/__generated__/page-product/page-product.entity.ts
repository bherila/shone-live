/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<RCEDsfY6Ef3RtyljK2/Hj8cDGxaHJuHm>>
 */

import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity({ name: 'page_product' })
export class PageProduct {
  @Field({
    name: 'ent_id',
    description: 'Global unique ID for this entity (within SHONE)',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'ent_id' })
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

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'total_pages',
  })
  @Column({
    name: 'total_pages',
    type: 'bigint',
  })
  totalPages: number

  // Gen from: {"type":"integer","format":"int64"}
  @Field({
    name: 'total_elements',
  })
  @Column({
    name: 'total_elements',
    type: 'bigint',
  })
  totalElements: number

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'size',
  })
  @Column({
    name: 'size',
    type: 'bigint',
  })
  size: number

  // Gen from: {"type":"array","items":{"$ref":"#/definitions/Product"}}
  @Field({
    name: 'content',
  })
  @Column({
    name: 'content',
  })
  content: string

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'number',
  })
  @Column({
    name: 'number',
    type: 'bigint',
  })
  number: number

  // Gen from: {"$ref":"#/definitions/Sort"}
  @Field({
    name: 'sort',
  })
  @JoinColumn({
    name: 'sort_id',
  })
  sort: string

  // Gen from: {"type":"boolean","default":false}
  @Field({
    name: 'first',
  })
  @Column({
    name: 'first',
  })
  first: boolean

  // Gen from: {"type":"boolean","default":false}
  @Field({
    name: 'last',
  })
  @Column({
    name: 'last',
  })
  last: boolean

  // Gen from: {"type":"integer","format":"int32"}
  @Field({
    name: 'number_of_elements',
  })
  @Column({
    name: 'number_of_elements',
    type: 'bigint',
  })
  numberOfElements: number
}
