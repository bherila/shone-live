/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<EKosu2hfLzhCYTZHGW3QLqnCSV+59iqL>>
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
@Entity({ name: 'ent_show' })
export class EntShow {
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

  // Gen from: {"type":"","$ref":"#/definitions/User","dtoExclude":true}
  @Field({
    name: 'owner_user',
  })
  @JoinColumn({
    name: 'owner_user_id',
  })
  ownerUser: string

  // Gen from: {"type":"string","description":"title of the show"}
  @Field({
    name: 'title',
    description: 'title of the show',
  })
  @Column({
    name: 'title',
    type: 'text',
  })
  title: string

  // Gen from: {"type":"string","description":"description of the show"}
  @Field({
    name: 'description',
    description: 'description of the show',
  })
  @Column({
    name: 'description',
    type: 'text',
  })
  description: string

  // Gen from: {"type":"string","description":"date and time the show will start (store in UTC"}
  @Field({
    name: 'start_date',
    description: 'date and time the show will start (store in UTC',
  })
  @Column({
    name: 'start_date',
    type: 'text',
  })
  startDate: string

  // Gen from: {"type":"string","description":"date and time the show will end (store in UTC)"}
  @Field({
    name: 'end_date',
    description: 'date and time the show will end (store in UTC)',
  })
  @Column({
    name: 'end_date',
    type: 'text',
  })
  endDate: string
}
