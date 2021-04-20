/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<qWhTor0J/v9PSSvwG/F+e/kQn/FE+PVI>>
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
@Entity({ name: 'order_address' })
export class OrderAddress {
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

  // Gen from: {"type":"string","description":"Name on Address"}
  @Field({
    name: 'name',
    description: 'Name on Address',
  })
  @Column({
    name: 'name',
    type: 'text',
  })
  name: string

  // Gen from: {"type":"string","description":"City"}
  @Field({
    name: 'city',
    description: 'City',
  })
  @Column({
    name: 'city',
    type: 'text',
  })
  city: string

  // Gen from: {"type":"string","description":"State Abbreviation"}
  @Field({
    name: 'state',
    description: 'State Abbreviation',
  })
  @Column({
    name: 'state',
    type: 'text',
  })
  state: string

  // Gen from: {"type":"string","description":"Country ISO2 Code"}
  @Field({
    name: 'country',
    description: 'Country ISO2 Code',
  })
  @Column({
    name: 'country',
    type: 'text',
  })
  country: string

  // Gen from: {"type":"string","description":"Postal/Zip Code"}
  @Field({
    name: 'postal_code',
    description: 'Postal/Zip Code',
  })
  @Column({
    name: 'postal_code',
    type: 'text',
  })
  postalCode: string

  // Gen from: {"type":"string","description":"Phone Number"}
  @Field({
    name: 'phone',
    description: 'Phone Number',
  })
  @Column({
    name: 'phone',
    type: 'text',
  })
  phone: string

  // Gen from: {"type":"string","description":"Address Type","enum":["shipping","billing"]}
  @Field({
    name: 'type',
    description: 'Address Type',
  })
  @Column({
    name: 'type',
    type: 'text',
  })
  type: string

  // Gen from: {"type":"string","description":"First line of the Address"}
  @Field({
    name: 'address_1',
    description: 'First line of the Address',
  })
  @Column({
    name: 'address_1',
    type: 'text',
  })
  address_1: string

  // Gen from: {"type":"string","description":"Second line of the Address"}
  @Field({
    name: 'address_2',
    description: 'Second line of the Address',
  })
  @Column({
    name: 'address_2',
    type: 'text',
  })
  address_2: string
}
