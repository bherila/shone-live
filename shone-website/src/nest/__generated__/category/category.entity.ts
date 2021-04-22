/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<nJFT42DKXr/EDPKT5cLRZh1UlvgDr9rL>>
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
@Entity({ name: 'category' })
export class Category {
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

  // Gen from: {"type":"string","read_only":true}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'text',
  })
  id: string

  // Gen from: {"type":"string","description":"Category Name"}
  @Field({
    name: 'name',
    description: 'Category Name',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"string","description":"Category Slug"}
  @Field({
    name: 'slug',
    description: 'Category Slug',
  })
  @Column({
    name: 'slug',
    type: 'text',
  })
  slug: string

  // Gen from: {"type":"string","description":"Parent ID"}
  @Field({
    name: 'parent_id',
    description: 'Parent ID',
  })
  @Column({
    name: 'parent_id',
    type: 'text',
  })
  parentId: string

  // Gen from: {"type":"integer","format":"int32","description":"Category Depth"}
  @Field({
    name: 'depth',
    description: 'Category Depth',
  })
  @Column({
    name: 'depth',
    type: 'bigint',
  })
  depth: number
}
