/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<WppOm8sSxlepCdq6m6HlAMMEOpqBMBzo>>
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
@Entity({ name: 'guest_order_customer' })
export class GuestOrderCustomer {
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

  // Gen from: {"type":"string","description":"First Name"}
  @Field({
    name: 'first_name',
    description: 'First Name',
  })
  @Column({
    name: 'first_name',
    type: 'text',
  })
  firstName: string

  // Gen from: {"type":"string","description":"Last Name"}
  @Field({
    name: 'last_name',
    description: 'Last Name',
  })
  @Column({
    name: 'last_name',
    type: 'text',
  })
  lastName: string

  // Gen from: {"type":"string","description":"Email Address of Customer"}
  @Field({
    name: 'email',
    description: 'Email Address of Customer',
  })
  @Column({
    name: 'email',
    type: 'text',
  })
  email: string
}
