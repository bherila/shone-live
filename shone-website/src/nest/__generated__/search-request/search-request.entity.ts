/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<0gNd9M3Hv2J5jRP+0KWf1A/yVd0ykglW>>
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
@Entity({ name: 'search_request' })
export class SearchRequest {
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

  // Gen from: {"type":"string","description":"Query"}
  @Field({
    name: 'query',
    description: 'Query',
  })
  @Column({
    name: 'query',
    type: 'text',
  })
  query: string

  // Gen from: {"type":"integer","format":"int32","description":"Merchant ID"}
  @Field({
    name: 'merchant_id',
    description: 'Merchant ID',
  })
  @Column({
    name: 'merchant_id',
    type: 'bigint',
  })
  merchantId: number

  // Gen from: {"type":"string","description":"Category ID"}
  @Field({
    name: 'category_id',
    description: 'Category ID',
  })
  @Column({
    name: 'category_id',
    type: 'text',
  })
  categoryId: string

  // Gen from: {"type":"string","description":"Category Slug"}
  @Field({
    name: 'category_slug',
    description: 'Category Slug',
  })
  @Column({
    name: 'category_slug',
    type: 'text',
  })
  categorySlug: string

  // Gen from: {"type":"number","format":"double","description":"Minimum Commission"}
  @Field({
    name: 'min_commission',
    description: 'Minimum Commission',
  })
  @Column({
    name: 'min_commission',
  })
  minCommission: number

  // Gen from: {"type":"number","format":"double","description":"Maximum Commission"}
  @Field({
    name: 'max_commission',
    description: 'Maximum Commission',
  })
  @Column({
    name: 'max_commission',
  })
  maxCommission: number

  // Gen from: {"type":"integer","format":"int32","description":"Minimum Price"}
  @Field({
    name: 'min_price',
    description: 'Minimum Price',
  })
  @Column({
    name: 'min_price',
    type: 'bigint',
  })
  minPrice: number

  // Gen from: {"type":"integer","format":"int32","description":"Maximum Price"}
  @Field({
    name: 'max_price',
    description: 'Maximum Price',
  })
  @Column({
    name: 'max_price',
    type: 'bigint',
  })
  maxPrice: number

  // Gen from: {"type":"boolean","description":"Include offers with products","default":false}
  @Field({
    name: 'include_offers',
    description: 'Include offers with products',
  })
  @Column({
    name: 'include_offers',
  })
  includeOffers: boolean
}
