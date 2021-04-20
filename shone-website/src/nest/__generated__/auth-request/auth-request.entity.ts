/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<qhLGWWKrFFDV79bkvNm4aBAx1ifW/qVd>>
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
@Entity({ name: 'auth_request' })
export class AuthRequest {
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

  // Gen from: {"type":"integer","format":"int64","description":"ID of User authorizing the App"}
  @Field({
    name: 'user_id',
    description: 'ID of User authorizing the App',
  })
  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number

  // Gen from: {"type":"string","description":"Code used to confirm the request"}
  @Field({
    name: 'code',
    description: 'Code used to confirm the request',
  })
  @Column({
    name: 'code',
    type: 'text',
  })
  code: string

  // Gen from: {"type":"string","description":"Authorization Token"}
  @Field({
    name: 'token',
    description: 'Authorization Token',
  })
  @Column({
    name: 'token',
    type: 'text',
  })
  token: string

  // Gen from: {"type":"string","description":"Status of the request","enum":["pending","completed","expired"]}
  @Field({
    name: 'status',
    description: 'Status of the request',
  })
  @Column({
    name: 'status',
    type: 'text',
  })
  status: string

  // Gen from: {"type":"string","description":"Scope of the requested permissions"}
  @Field({
    name: 'scope',
    description: 'Scope of the requested permissions',
  })
  @Column({
    name: 'scope',
    type: 'text',
  })
  scope: string

  // Gen from: {"type":"string","format":"date-time","description":"Time the request expires","read_only":true}
  @Field({
    name: 'date_expires',
    description: 'Time the request expires',
  })
  @Column({
    name: 'date_expires',
    type: 'text',
  })
  dateExpires: Date
}
