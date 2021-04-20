/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<aw49ts+Ueh7tphE2mX4sEkodM5nj4U80>>
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
@Entity({ name: 'webhook_header' })
export class WebhookHeader {
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

  // Gen from: {"type":"integer","format":"int64","description":"App ID"}
  @Field({
    name: 'app_id',
    description: 'App ID',
  })
  @Column({
    name: 'app_id',
    type: 'bigint',
  })
  appId: number

  // Gen from: {"type":"integer","format":"int64","description":"ID of the webhook the header belongs to"}
  @Field({
    name: 'webhook_id',
    description: 'ID of the webhook the header belongs to',
  })
  @Column({
    name: 'webhook_id',
    type: 'bigint',
  })
  webhookId: number

  // Gen from: {"type":"string","description":"Header Key"}
  @Field({
    name: 'key',
    description: 'Header Key',
  })
  @Column({
    name: 'key',
    type: 'text',
  })
  key: string

  // Gen from: {"type":"string","description":"Header Value"}
  @Field({
    name: 'value',
    description: 'Header Value',
  })
  @Column({
    name: 'value',
    type: 'text',
  })
  value: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of webhook header creation","read_only":true}
  @Field({
    name: 'date_created',
    description: 'Date of webhook header creation',
  })
  @Column({
    name: 'date_created',
    type: 'text',
  })
  dateCreated: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last webhook header update","read_only":true}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last webhook header update',
  })
  @Column({
    name: 'date_last_modified',
    type: 'text',
  })
  dateLastModified: Date
}
