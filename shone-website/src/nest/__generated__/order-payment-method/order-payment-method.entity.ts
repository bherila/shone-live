/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<mwcxXEBsvImmfBmiQLqxy+d+aIaRDHgr>>
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
@Entity({ name: 'order_payment_method' })
export class OrderPaymentMethod {
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

  // Gen from: {"type":"string","description":"Brand of Card"}
  @Field({
    name: 'brand',
    description: 'Brand of Card',
  })
  @Column({
    name: 'brand',
    type: 'text',
  })
  brand: string

  // Gen from: {"type":"string","description":"Last Four Numbers on Card"}
  @Field({
    name: 'last_four',
    description: 'Last Four Numbers on Card',
  })
  @Column({
    name: 'last_four',
    type: 'text',
  })
  lastFour: string

  // Gen from: {"type":"integer","format":"int32","description":"Card Expiration Month"}
  @Field({
    name: 'exp_month',
    description: 'Card Expiration Month',
  })
  @Column({
    name: 'exp_month',
    type: 'bigint',
  })
  expMonth: number

  // Gen from: {"type":"integer","format":"int32","description":"Card Expiration Year"}
  @Field({
    name: 'exp_year',
    description: 'Card Expiration Year',
  })
  @Column({
    name: 'exp_year',
    type: 'bigint',
  })
  expYear: number

  // Gen from: {"type":"string","description":"Name as it appears on card."}
  @Field({
    name: 'cardholder_name',
    description: 'Name as it appears on card.',
  })
  @Column({
    name: 'cardholder_name',
    type: 'text',
  })
  cardholderName: string

  // Gen from: {"type":"integer","format":"int64","description":"ID of the referenced Payment Method"}
  @Field({
    name: 'payment_method_id',
    description: 'ID of the referenced Payment Method',
  })
  @Column({
    name: 'payment_method_id',
    type: 'bigint',
  })
  paymentMethodId: number

  // Gen from: {"type":"boolean","description":"Is Default Method","default":false}
  @Field({
    name: 'default',
    description: 'Is Default Method',
  })
  @Column({
    name: 'default',
  })
  default: boolean
}
