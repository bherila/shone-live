import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Address } from "../addresses/entities/address.entity";
import PostgresErrorCode from "../common/database/postgres-error-code.enum";
import { UniquenessConstraintException } from "../common/exceptions/uniqueness-constraint-violation.exception";
import { StripeService } from "../stripe/stripe.service";
import { User } from "../users/entities/user.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { Card } from "./entities/card.entity";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly stripeService: StripeService
  ) {}

  async create(createCardDto: CreateCardDto) {
    const stripeCard = await this.stripeService.createStripeCard(
      createCardDto.user,
      createCardDto.stripeCardToken
    );
    const user = await this.userRepository.findOne(createCardDto.user); // should be userId
    const address = this.addressRepository.create(
      this.stripeService.getAddressFromCard(stripeCard)
    );
    try {
      const card = this.cardRepository.create({
        id: stripeCard.id,
        address: address,
        user: user,
        // needed to cast all these below as any because there is a typing error in the stripe library
        // check back if stripe will support order object with payment method/payment intent in future
        address_zip_check: (stripeCard as any).address_zip_check,
        brand: (stripeCard as any).brand,
        country: (stripeCard as any).country,
        cvc_check: (stripeCard as any).cvc_check,
        exp_month: (stripeCard as any).exp_month,
        exp_year: (stripeCard as any).exp_year,
        fingerprint: (stripeCard as any).fingerprint,
        funding: (stripeCard as any).funding,
        last4: (stripeCard as any).last4,
        name: (stripeCard as any).name
      });
      return await this.cardRepository.save(card);
    } catch (error) {
      if (error?.code === PostgresErrorCode.unique_violation) {
        throw new UniquenessConstraintException(`${error.detail}`);
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
