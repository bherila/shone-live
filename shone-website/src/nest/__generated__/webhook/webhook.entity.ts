/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<39tR+VbVZCF5CmFPt2Ja4Q3XeVATypAR>>
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
@Entity({ name: 'webhook' })
export class Webhook {
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

  // Gen from: {"type":"integer","format":"int64","read_only":true}
  @Field({
    name: 'app_id',
  })
  @Column({
    name: 'app_id',
    type: 'bigint',
  })
  appId: number

  // Gen from: {"type":"string","description":"The event being triggered","enum":["order_updated","order_shipped","order_completed","order_canceled"]}
  @Field({
    name: 'event',
    description: 'The event being triggered',
  })
  @Column({
    name: 'event',
    type: 'text',
  })
  event: string

  // Gen from: {"type":"string","description":"Remote endpoint the webhook posts against."}
  @Field({
    name: 'remote_endpoint',
    description: 'Remote endpoint the webhook posts against.',
  })
  @Column({
    name: 'remote_endpoint',
    type: 'text',
  })
  remoteEndpoint: string

  // Gen from: {"type":"string","description":"Status of the webhook","enum":["inactive","active","disabled"]}
  @Field({
    name: 'status',
    description: 'Status of the webhook',
  })
  @Column({
    name: 'status',
    type: 'text',
  })
  status: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of webhook creation","read_only":true}
  @Field({
    name: 'date_created',
    description: 'Date of webhook creation',
  })
  @Column({
    name: 'date_created',
    type: 'text',
  })
  dateCreated: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last webhook update","read_only":true}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last webhook update',
  })
  @Column({
    name: 'date_last_modified',
    type: 'text',
  })
  dateLastModified: Date
}
