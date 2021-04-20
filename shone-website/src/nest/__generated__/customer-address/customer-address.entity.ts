/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<hYSqN5oF8zEsIp4Wi/kWmtHix/KeDFJi>>
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
@Entity({ name: 'customer_address' })
export class CustomerAddress {
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

  // Gen from: {"description":"Customer","$ref":"#/definitions/OrderCustomer"}
  @Field({
    name: 'customer',
    description: 'Customer',
  })
  @JoinColumn({
    name: 'customer_id',
  })
  customer: string

  // Gen from: {"description":"Customer Shipping Address","$ref":"#/definitions/OrderAddress"}
  @Field({
    name: 'shipping_address',
    description: 'Customer Shipping Address',
  })
  @JoinColumn({
    name: 'shipping_address_id',
  })
  shippingAddress: string

  // Gen from: {"description":"Customer Billing Address","$ref":"#/definitions/OrderAddress"}
  @Field({
    name: 'billing_address',
    description: 'Customer Billing Address',
  })
  @JoinColumn({
    name: 'billing_address_id',
  })
  billingAddress: string
}
