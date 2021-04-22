/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ptp5wr/FWpJ1odJprVgrVk2si4u/wLfV>>
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
@Entity({ name: 'media' })
export class Media {
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

  // Gen from: {"type":"integer","format":"int64","description":"Album ID"}
  @Field({
    name: 'album_id',
    description: 'Album ID',
  })
  @Column({
    name: 'album_id',
    type: 'bigint',
  })
  albumId: number

  // Gen from: {"type":"string","description":"External ID"}
  @Field({
    name: 'external_id',
    description: 'External ID',
  })
  @Column({
    name: 'external_id',
    type: 'text',
  })
  externalId: string

  // Gen from: {"type":"string","description":"ID of hosted cloud entity"}
  @Field({
    name: 'cloud_id',
    description: 'ID of hosted cloud entity',
  })
  @Column({
    name: 'cloud_id',
    type: 'text',
  })
  cloudId: string

  // Gen from: {"type":"string","description":"Media URL"}
  @Field({
    name: 'url',
    description: 'Media URL',
  })
  @Column({
    name: 'url',
    type: 'text',
  })
  url: string

  // Gen from: {"type":"string","description":"Media Source URL"}
  @Field({
    name: 'source_url',
    description: 'Media Source URL',
  })
  @Column({
    name: 'source_url',
    type: 'text',
  })
  sourceUrl: string

  // Gen from: {"type":"string","description":"Media Type","enum":["image","video"]}
  @Field({
    name: 'type',
    description: 'Media Type',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"integer","format":"int32","description":"Display Order"}
  @Field({
    name: 'display_order',
    description: 'Display Order',
  })
  @Column({
    name: 'display_order',
    type: 'bigint',
  })
  displayOrder: number

  // Gen from: {"type":"boolean","description":"Primary Media","default":false}
  @Field({
    name: 'primary_media',
    description: 'Primary Media',
  })
  @Column({
    name: 'primary_media',
  })
  primaryMedia: boolean
}
