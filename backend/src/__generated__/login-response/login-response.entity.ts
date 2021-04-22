/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Zj37LBqEDsyFm6Oy7dRgzAgPXwGPC9Gw>>
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
@Entity({ name: 'login_response' })
export class LoginResponse {
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

  // Gen from: {"read_only":true,"type":"integer","format":"int64"}
  @Field({
    name: 'id',
  })
  @Column({
    name: 'id',
    type: 'bigint',
  })
  id: number

  // Gen from: {"type":"string","description":"The users first name"}
  @Field({
    name: 'first_name',
    description: 'The users first name',
  })
  @Column({
    name: 'first_name',
    type: 'text',
  })
  firstName: string

  // Gen from: {"type":"string","description":"The users last name"}
  @Field({
    name: 'last_name',
    description: 'The users last name',
  })
  @Column({
    name: 'last_name',
    type: 'text',
  })
  lastName: string

  // Gen from: {"type":"string","description":"The users raw desired password"}
  @Field({
    name: 'password',
    description: 'The users raw desired password',
  })
  @Column({
    name: 'password',
    type: 'text',
  })
  password: string

  // Gen from: {"type":"string","description":"The users unique email address"}
  @Field({
    name: 'email',
    description: 'The users unique email address',
  })
  @Column({
    name: 'email',
    type: 'text',
  })
  email: string

  // Gen from: {"type":"integer","format":"int32","description":"The Id of the Store the User is associated to."}
  @Field({
    name: 'merchant_id',
    description: 'The Id of the Store the User is associated to.',
  })
  @Column({
    name: 'merchant_id',
    type: 'bigint',
  })
  merchantId: number

  // Gen from: {"type":"string","description":"The allowed values for the user type","enum":["ADMIN","MERCHANT","USER","DEVELOPER"]}
  @Field({
    name: 'type',
    description: 'The allowed values for the user type',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"boolean","description":"If a user has verified their emailed address","default":false}
  @Field({
    name: 'verified',
    description: 'If a user has verified their emailed address',
  })
  @Column({
    name: 'verified',
  })
  verified: boolean

  // Gen from: {"type":"string","description":"The status of the user","enum":["INACTIVE","ACTIVE","DISABLED"]}
  @Field({
    name: 'status',
    description: 'The status of the user',
  })
  @Column({
    name: 'status',
    type: 'text',
  })
  status: string

  // Gen from: {"type":"string","format":"date-time","description":"Date of account creation"}
  @Field({
    name: 'date_created',
    description: 'Date of account creation',
  })
  @Column({
    name: 'date_created',
    type: 'text',
  })
  dateCreated: Date

  // Gen from: {"type":"string","format":"date-time","description":"Date of last account update"}
  @Field({
    name: 'date_last_modified',
    description: 'Date of last account update',
  })
  @Column({
    name: 'date_last_modified',
    type: 'text',
  })
  dateLastModified: Date

  // Gen from: {"type":"array","unique_items":true,"items":{"$ref":"#/definitions/Role"}}
  @Field({
    name: 'roles',
  })
  @Column({
    name: 'roles',
  })
  roles: string

  // Gen from: {"type":"string","description":"Users Access Token. Currently expires after 1440 minutes."}
  @Field({
    name: 'token',
    description: 'Users Access Token. Currently expires after 1440 minutes.',
  })
  @Column({
    name: 'token',
    type: 'text',
  })
  token: string

  // Gen from: {"type":"string","description":"Users Refresh Token. Never expires."}
  @Field({
    name: 'refresh_token',
    description: 'Users Refresh Token. Never expires.',
  })
  @Column({
    name: 'refresh_token',
    type: 'text',
  })
  refreshToken: string
}
