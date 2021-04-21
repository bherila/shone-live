/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<qDX2rgQr6E9qwHRODvM3uKluZ+kW8siX>>
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
@Entity({ name: 'album' })
export class Album {
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

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'bigint',
  })
  id: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the parent entity"}
  @Field({
    name: 'parent_id',
    description: 'ID of the parent entity',
  })
  @Column({
    name: 'parent_id',
    type: 'bigint',
  })
  parentId: number

  // Gen from: {"type":"string","description":"Parent Type","enum":["offer","sku"]}
  @Field({
    name: 'type',
    description: 'Parent Type',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"string","description":"Name of Album"}
  @Field({
    name: 'name',
    description: 'Name of Album',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"array","description":"Album media","unique_items":true,"items":{"$ref":"#/definitions/Media"}}
  @Field({
    name: 'media',
    description: 'Album media',
  })
  @Column({
    name: 'media',
  })
  media: string
}
