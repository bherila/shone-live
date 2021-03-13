import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AddressesService } from '../addresses/addresses.service';
import { Card } from '../cards/entities/card.entity';
import { OrderSku } from '../order-skus/entities/order-sku.entity';
import { Order } from '../orders/entities/order.entity';
import { Show } from '../shows/entities/show.entity';
import { Sku } from '../skus/entities/sku.entity';
import { StripeService } from '../stripe/stripe.service';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersQueryDto } from './dto/orders-query.dto';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Sku)
    private readonly skuRepository: Repository<Sku>,
    @InjectRepository(OrderSku)
    private readonly orderSkuRepository: Repository<OrderSku>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    private readonly stripeService: StripeService,
    private readonly addressesService: AddressesService,
  ) {}

  findAll(getOrderDto: OrdersQueryDto) {
    const { limit, offset, show_id } = getOrderDto;
    if (show_id) {
      this.showRepository.findOne({ where: { id: show_id } }).then(show => {
        return this.orderRepository.find({
          where: { show: show._id },
          relations: ['user', 'address', 'show', 'card'],
          skip: offset,
          take: limit,
        });
      });
    }

    return this.orderRepository.find({
      relations: ['user', 'address', 'show', 'card'],
      skip: offset,
      take: limit,
    });
  }

  // TODO: need to set up webhooks for enum update from stripe after order is paid
  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findOne(createOrderDto.user_id);
    const show = await this.showRepository.findOne(createOrderDto.show_id);
    const card = await this.cardRepository.findOne(createOrderDto.card_id);
    const stripeOrder = await this.stripeService.createStripeOrder(
      createOrderDto,
      user,
    );
    const sku = await this.skuRepository.findOne(createOrderDto.sku);
    if (!(sku.showId == createOrderDto.show_id)) {
      throw new HttpException(
        `SKU ${sku.id} is not available in show ${createOrderDto.show_id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedAddress = await this.addressesService.create(
      this.stripeService.getAddressFromOrder(stripeOrder),
      user,
    );

    const order = await this.orderRepository.create({
      id: stripeOrder.id,
      address: savedAddress,
      user: user,
      show: show,
      status: stripeOrder.status,
      stripe_created: this.stripeService.secondsToISOString(
        stripeOrder.created,
      ),
      stripe_updated: this.stripeService.secondsToISOString(
        stripeOrder.updated,
      ),
      total_amount: stripeOrder.amount,
      card: card,
    });
    if (createOrderDto.email) {
      order.email = createOrderDto.email;
    }
    const savedOrder = await this.orderRepository.save(order);

    // save the link of sku to order (only 1 for now)
    const orderSku = await this.orderSkuRepository.create({
      order: savedOrder,
      sku: sku,
      quantity: createOrderDto.quantity,
    });
    this.orderSkuRepository.save(orderSku);

    // pay the order
    const paidOrder = await this.stripeService.payStripeOrder(
      stripeOrder.id,
      createOrderDto.user_id,
    );
    // add code for when paying order fails
    savedOrder.status = OrderStatus.paid;
    savedOrder.paid = this.stripeService.secondsToDate(
      paidOrder.status_transitions.paid,
    );

    sku.current_quantity -= createOrderDto.quantity;
    this.skuRepository.save(sku);
    return this.orderRepository.save(savedOrder); //is there a more correct way to do this?
  }
}
