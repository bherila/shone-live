import { Address } from 'src/addresses/entities/address.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryColumn({
    comment: 'stripe id is used to match 1 to 1',
  })
  id: string; // comes from stripe

  @Column({
    comment:
      'If address_zip was provided, results of the check: pass, fail, unavailable, or unchecked.',
    nullable: true,
  })
  address_zip_check: string;

  @Column({
    comment:
      'Card brand. Can be American Express, Diners Club, Discover, JCB, MasterCard, UnionPay, Visa, or Unknown.',
  })
  brand: string;

  @Column({
    comment:
      'Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you’ve collected.',
  })
  country: string;

  @Column({
    comment:
      'If a CVC was provided, results of the check: pass, fail, unavailable, or unchecked. A result of unchecked indicates that CVC was provided but hasn’t been checked yet. Checks are typically performed when attaching a card to a Customer object, or when creating a charge. For more details, see Check if a card is valid without a charge.',
    nullable: true,
  })
  cvc_check: string;

  @Column({
    comment: 'Two-digit number representing the card’s expiration month.',
  })
  exp_month: number;

  @Column({
    comment: 'Four-digit number representing the card’s expiration year.',
  })
  exp_year: number;

  @Column({
    comment:
      'Uniquely identifies this particular card number. You can use this attribute to check whether two customers who’ve signed up with you are using the same card number,for example. For payment methods that tokenize card information (Apple Pay, Google Pay), the tokenized number might be provided instead of the underlying card number.',
  })
  fingerprint: string;

  @Column({
    comment: 'Card funding type. Can be credit, debit, prepaid, or unknown.',
  })
  funding: string;

  @Column({
    comment: 'The last four digits of the card.',
  })
  last4: string;

  @Column({
    comment: 'Cardholders name, can differ from users name.',
    nullable: true,
  })
  name: string;

  @ManyToOne(
    type => Address,
    Address => Address.cards,
    {
      cascade: ['insert', 'update'],
      nullable: true,
    },
  )
  address: Address;

  @ManyToOne(
    type => User,
    user => user.cards,
    {
      cascade: ['insert', 'update'],
    },
  )
  user: User;

  @OneToMany(
    order => Order,
    order => order.card,
  )
  orders: Order[];
}
