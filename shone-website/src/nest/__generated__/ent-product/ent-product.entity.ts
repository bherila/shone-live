/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<BHCgR2r5lvPEqJiWV1hobLKi5g/4Mu9V>>
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
@Entity({ name: 'ent_product' })
export class EntProduct {
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

  // Gen from: {"type":"","$ref":"#/definitions/User","dtoExclude":true}
  @Field({
    name: 'owner_user',
  })
  @JoinColumn({
    name: 'owner_user_id',
  })
  ownerUser: string

  // Gen from: {"type":"string"}
  @Field({
    name: 'product_name',
  })
  @Column({
    name: 'product_name',
    type: 'text',
  })
  productName: string
}
