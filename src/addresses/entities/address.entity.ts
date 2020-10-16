import { Card } from 'src/cards/entities/card.entity';
import { Order } from 'src/orders/entities/order.entity';
import { UserAddress } from 'src/user-addresses/user-address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: 'city where address is located',
  })
  city: string;

  @Column({
    comment:
      '2 character country code https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements',
    default: 'US',
  })
  country: string;

  @Column({
    comment: 'first line of address, usually number and street name',
  })
  line1: string;

  @Column({
    comment: 'second line of address, eg appartment or suite etc',
    nullable: true,
  })
  line2: string;

  @Column({
    comment: 'for usa is zip code, should be verified against list',
    nullable: true,
  })
  postal_code: string;

  @Column({
    comment: 'for usa should be 2 character abreviation verified against list',
    nullable: true,
  })
  state: string;

  @Column({
    comment: 'name of addressee at that address, doesnt have to be customers',
    nullable: true,
  })
  name: string;

  @Column({
    comment: 'phone of addressee at that address, doesnt have to be customers',
    nullable: true,
  })
  phone: string;

  @OneToMany(
    type => UserAddress,
    userAddress => userAddress.address,
    {
      cascade: true,
    },
  )
  userAddresses: UserAddress[];

  @OneToMany(
    type => Card,
    card => card.address,
    {
      cascade: true,
      nullable: true,
    },
  )
  cards: Card[];

  @OneToMany(
    type => Order,
    order => order.address,
    {
      cascade: true,
      nullable: true,
    },
  )
  orders: Order[];
}
