/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<x9ZH6ffflZgOI1qBNzjT9ujxGAsLxffd>>
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
@Entity({ name: 'cart_payment_method' })
export class CartPaymentMethod {
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

  // Gen from: {"type":"string","description":"Generated payment token."}
  @Field({
    name: 'token',
    description: 'Generated payment token.',
  })
  @Column({
    name: 'token',
    type: 'text',
  })
  token: string

  // Gen from: {"type":"string","description":"Number on the credit or debit card."}
  @Field({
    name: 'card_number',
    description: 'Number on the credit or debit card.',
  })
  @Column({
    name: 'card_number',
    type: 'text',
  })
  cardNumber: string

  // Gen from: {"type":"integer","format":"int32","description":"CVC code on the credit or debit card."}
  @Field({
    name: 'card_cvc',
    description: 'CVC code on the credit or debit card.',
  })
  @Column({
    name: 'card_cvc',
    type: 'bigint',
  })
  cardCvc: number

  // Gen from: {"type":"integer","format":"int32","description":"Expiration month of the credit or debit card."}
  @Field({
    name: 'card_exp_month',
    description: 'Expiration month of the credit or debit card.',
  })
  @Column({
    name: 'card_exp_month',
    type: 'bigint',
  })
  cardExpMonth: number

  // Gen from: {"type":"integer","format":"int32","description":"Expiration year of the credit or debit card."}
  @Field({
    name: 'card_exp_year',
    description: 'Expiration year of the credit or debit card.',
  })
  @Column({
    name: 'card_exp_year',
    type: 'bigint',
  })
  cardExpYear: number

  // Gen from: {"type":"string","description":"Postal Code of the credit or debit card."}
  @Field({
    name: 'card_postal_code',
    description: 'Postal Code of the credit or debit card.',
  })
  @Column({
    name: 'card_postal_code',
    type: 'text',
  })
  cardPostalCode: string
}
