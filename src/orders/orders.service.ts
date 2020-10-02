import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderSku } from 'src/order-skus/entities/order-sku.entity';
import { Sku } from 'src/skus/entities/sku.entity';
import { OrderStatus } from './enums/order-status.enum';
import { Card } from 'src/cards/entities/card.entity';
import { AddressesService } from 'src/addresses/addresses.service';

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
        private readonly stripeService: StripeService,
        private readonly addressesService: AddressesService,
    ) { }

    // TODO: need to set up webhooks for enum update from stripe after order is paid
    async create(createOrderDto: CreateOrderDto) {
        const user = await this.userRepository.findOne(createOrderDto.user);
        const card = await this.cardRepository.findOne(createOrderDto.card);
        const stripeOrder = await this.stripeService.createStripeOrder(createOrderDto, user);
        const sku = await this.skuRepository.findOne(createOrderDto.sku);
        const savedAddress = await this.addressesService.create(this.stripeService.getAddressFromOrder(stripeOrder), user);

        const order = await this.orderRepository.create({
            id: stripeOrder.id,
            address: savedAddress,
            user: user,
            status: stripeOrder.status,
            stripe_created: this.stripeService.secondsToISOString(stripeOrder.created),
            stripe_updated: this.stripeService.secondsToISOString(stripeOrder.updated),
            total_amount: stripeOrder.amount,
            card: card,
        });
        if (createOrderDto.email) { order.email = createOrderDto.email; }
        const savedOrder = await this.orderRepository.save(order);

        // save the link of sku to order (only 1 for now)
        const orderSku = await this.orderSkuRepository.create({
            order: savedOrder,
            sku: sku,
            quantity: createOrderDto.quantity,
        })
        this.orderSkuRepository.save(orderSku);

        // pay the order
        const paidOrder = await this.stripeService.payStripeOrder(stripeOrder.id, createOrderDto.user);
        // add code for when paying order fails
        savedOrder.status = OrderStatus.paid;
        savedOrder.paid = this.stripeService.secondsToDate(paidOrder.status_transitions.paid);

        sku.current_quantity -= createOrderDto.quantity;
        this.skuRepository.save(sku);
        return this.orderRepository.save(savedOrder); //is there a more correct way to do this?
    }
}
