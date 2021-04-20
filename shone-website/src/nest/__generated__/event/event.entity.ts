/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<OzZ9rokIAJEkV3/c3RlQ6Ac+U9G4iDy/>>
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
@Entity({ name: 'event' })
export class Event {
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

  // Gen from: {"type":"integer","format":"int64","description":"User ID"}
  @Field({
    name: 'user_id',
    description: 'User ID',
  })
  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number

  // Gen from: {"type":"string","description":"The type of event","enum":["create","update","delete"]}
  @Field({
    name: 'type',
    description: 'The type of event',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"string","description":"Message event body","min_length":0,"max_length":255}
  @Field({
    name: 'message',
    description: 'Message event body',
  })
  @Column({
    name: 'message',
    type: 'text',
  })
  message: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of account creation","read_only":true}
  @Field({
    name: 'date_created',
    description: 'Date of account creation',
  })
  @Column({
    name: 'date_created',
    type: 'text',
  })
  dateCreated: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last account update","read_only":true}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last account update',
  })
  @Column({
    name: 'date_last_modified',
    type: 'text',
  })
  dateLastModified: Date
}
