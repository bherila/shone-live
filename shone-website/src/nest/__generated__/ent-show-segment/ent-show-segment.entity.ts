/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Wr/RRRSkLUtwuES2WvBOkKSiTLiZWzWa>>
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
@Entity({ name: 'ent_show_segment' })
export class EntShowSegment {
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

  // Gen from: {"type":"","$ref":"#/definitions/EntShow"}
  @Field({
    name: 'show',
  })
  @JoinColumn({
    name: 'show_id',
  })
  show: string

  // Gen from: {"type":"string","description":"title of the show segment, for shows with 1 segment this can be null"}
  @Field({
    name: 'title',
    description:
      'title of the show segment, for shows with 1 segment this can be null',
  })
  @Column({
    name: 'title',
    type: 'text',
  })
  title: string

  // Gen from: {"type":"string","description":"description of the show segment"}
  @Field({
    name: 'description',
    description: 'description of the show segment',
  })
  @Column({
    name: 'description',
    type: 'text',
  })
  description: string
}
