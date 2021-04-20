/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<mAZnVfhyUoVacOvmtRcCDqF9mZzEIn0p>>
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
@Entity({ name: 'app' })
export class App {
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

  // Gen from: {"type":"integer","format":"int64","description":"User ID of Owner"}
  @Field({
    name: 'owner_id',
    description: 'User ID of Owner',
  })
  @Column({
    name: 'owner_id',
    type: 'bigint',
  })
  ownerId: number

  // Gen from: {"type":"string"}
  @Field({
    name: 'app_secret',
  })
  @Column({
    name: 'app_secret',
    type: 'text',
  })
  appSecret: string

  // Gen from: {"type":"string","description":"The name of the team/business/project"}
  @Field({
    name: 'name',
    description: 'The name of the team/business/project',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"string","description":"App description"}
  @Field({
    name: 'description',
    description: 'App description',
  })
  @Column({
    name: 'description',
    type: 'text',
  })
  description: string

  // Gen from: {"type":"string","description":"Remote Callback URL"}
  @Field({
    name: 'auth_callback_url',
    description: 'Remote Callback URL',
  })
  @Column({
    name: 'auth_callback_url',
    type: 'text',
  })
  authCallbackUrl: string

  // Gen from: {"type":"string","description":"Auth Redirect URL"}
  @Field({
    name: 'auth_redirect_url',
    description: 'Auth Redirect URL',
  })
  @Column({
    name: 'auth_redirect_url',
    type: 'text',
  })
  authRedirectUrl: string

  // Gen from: {"type":"string","description":"Remote url of the icon file."}
  @Field({
    name: 'icon_url',
    description: 'Remote url of the icon file.',
  })
  @Column({
    name: 'icon_url',
    type: 'text',
  })
  iconUrl: string

  // Gen from: {"type":"string","description":"API Version"}
  @Field({
    name: 'api_version',
    description: 'API Version',
  })
  @Column({
    name: 'api_version',
    type: 'text',
  })
  apiVersion: string

  // Gen from: {"type":"string","description":"App Status","enum":["inactive","active","disabled"]}
  @Field({
    name: 'status',
    description: 'App Status',
  })
  @Column({
    name: 'status',
    type: 'text',
  })
  status: string

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
