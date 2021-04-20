/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<UJ2bsH9oxpQ3Kyhe/825m85RHl55nZW6>>
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
@Entity({ name: 'ent_brand' })
export class EntBrand {
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

  // Gen from: {"type":"string","description":"name of the brand"}
  @Field({
    name: 'brand_name',
    description: 'name of the brand',
  })
  @Column({
    name: 'brand_name',
    type: 'text',
  })
  brandName: string

  // Gen from: {"type":"string","description":"URL to the brand's website"}
  @Field({
    name: 'brand_url',
    description: "URL to the brand's website",
  })
  @Column({
    name: 'brand_url',
    type: 'text',
  })
  brandUrl: string

  // Gen from: {"type":"string","description":"URL to the brand instagram page"}
  @Field({
    name: 'brand_ig_url',
    description: 'URL to the brand instagram page',
  })
  @Column({
    name: 'brand_ig_url',
    type: 'text',
  })
  brandIgUrl: string

  // Gen from: {"type":"string","description":"URL to the brand facebook page"}
  @Field({
    name: 'brand_fb_url',
    description: 'URL to the brand facebook page',
  })
  @Column({
    name: 'brand_fb_url',
    type: 'text',
  })
  brandFbUrl: string
}
