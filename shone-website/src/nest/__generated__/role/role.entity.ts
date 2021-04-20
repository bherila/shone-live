/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<UN70O7SiP6kOGlOjM1qLMCW7Vlt1Ct8o>>
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
@Entity({ name: 'role' })
export class Role {
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

  // Gen from: {"type":"string","description":"Name of the Role","min_length":1,"max_length":50,"pattern":"[A-Za-z]+"}
  @Field({
    name: 'name',
    description: 'Name of the Role',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"string","description":"Brief description of the Role","min_length":0,"max_length":255}
  @Field({
    name: 'description',
    description: 'Brief description of the Role',
  })
  @Column({
    name: 'description',
    type: 'text',
  })
  description: string

  // Gen from: {"type":"array","description":"Permissions available to this Role","unique_items":true,"items":{"$ref":"#/definitions/Permission"}}
  @Field({
    name: 'permissions',
    description: 'Permissions available to this Role',
  })
  @Column({
    name: 'permissions',
  })
  permissions: string
}
