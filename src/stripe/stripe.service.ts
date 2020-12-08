import Stripe from 'stripe';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateAddressDto } from '../addresses/dto/create-address.dto';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { CreateSkuDto } from '../skus/dto/create-sku.dto';
import { Sku } from '../skus/entities/sku.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StripeService {
  stripeClient: Stripe;

  public constructor() {
    this.stripeClient = new Stripe(process.env.STRIPE_DEV_KEY, {
      apiVersion: '2020-08-27',
    });
    if (process.env.NODE_ENV === 'dev') {
      console.info(
        'you are in DEV mode: Stripe client was loaded',
        this.stripeClient['_api'],
      );
    }
  }

  // data transformation helpers
  // stripe uses unix epoch timestamp, our database uses ISO
  secondsToISOString(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.toISOString();
  }

  // stripe uses unix epoch timestamp, our database uses ISO
  secondsToDate(seconds: number): Date {
    return new Date(seconds * 1000);
  }

  // todo figure out how to get stripe typings to make this require a stripe card object
  getAddressFromCard(stripeCard: any): CreateAddressDto {
    const data: CreateAddressDto = {
      user_id: stripeCard.customer,
      city: stripeCard.address_city,
      country: stripeCard.address_country,
      line1: stripeCard.address_line1,
      state: stripeCard.address_state,
      postal_code: stripeCard.address_zip,
    };
    if (stripeCard.address_line2) {
      data.line2 = stripeCard.address_line2;
    }

    // TODO: refactor to use the ObjService
    const keys = Object.keys(data);
    const missingValues: any = [];
    keys.forEach(key => data[key] == null && missingValues.push(key));
    if (missingValues.length > 0) {
      throw new HttpException(
        `Cannot save card info missing address data. Missing fields: ${missingValues}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }

  getAddressFromOrder(stripeOrder: any): CreateAddressDto {
    const data: CreateAddressDto = {
      user_id: stripeOrder.customer,
      city: stripeOrder.shipping.address.city,
      country: stripeOrder.shipping.address.country,
      line1: stripeOrder.shipping.address.line1,
      state: stripeOrder.shipping.address.state,
      postal_code: stripeOrder.shipping.address.postal_code,
    };
    if (stripeOrder.shipping.address.line2) {
      data.line2 = stripeOrder.shipping.address.line2;
    }
    return data;
  }

  // all interfaces from piki to stripe
  createStripeCustomer(createUserDto: CreateUserDto) {
    const data = this.formatCustomerData(createUserDto);
    return this.stripeClient.customers.create(data);
  }

  updateStripeCustomer(updateUserDto: UpdateUserDto) {
    const data = this.formatCustomerData(updateUserDto);
    return this.stripeClient.customers.update(data);
  }

  formatCustomerData(customerData: CreateUserDto | UpdateUserDto) {
    const data: any = {};
    data.address = customerData.address;
    data.email = customerData.email;
    data.name = `${customerData.first_name} ${customerData.last_name}`;
    data.phone = customerData.phone;
    data.shipping = customerData.shipping;
    // TODO: refactor to use the ObjService
    const keys = Object.keys(data);
    keys.forEach(key => data[key] == null && delete data[key]);
    return data;
  }

  async createStripeCard(user: string, cardToken: string) {
    return this.stripeClient.customers.createSource(user, {
      source: cardToken,
    });
  }

  async createStripeProduct(
    createProductDto: CreateProductDto,
    showId: number,
    showDate: string,
  ) {
    return this.stripeClient.products.create({
      name: createProductDto.name,
      active: true, // todo: update to false after show is done
      description: createProductDto.description,
      type: 'good',
      shippable: true,
      // images: ["some urls here"], // file path ...todo once files are saving path not just name // dummy data
      images: [
        'https://cdn.shopify.com/s/files/1/2143/3217/products/500_3f527d72-404b-4db7-a96c-471d1f97256e.png?v=1595523310',
      ], // dummy data
      metadata: {
        product_creator_user_id: createProductDto.user_id,
        show_id: showId,
        show_date: showDate,
      },
    });
  }

  // async createStripePrice(product: Product) {
  //     return this.stripeClient.prices.create({
  //         currency: 'usd',
  //         unit_amount: product.price,
  //         product: product.id.toString(),
  //     })
  // };

  // refactor to take the product and then the SKU specific info
  async createStripeSku(createSkuDto: CreateSkuDto) {
    return this.stripeClient.skus.create({
      product: createSkuDto.product,
      active: false,
      // attributes: {
      //   size: "Medium",
      //   gender: "Unisex"
      // },
      price: createSkuDto.price,
      currency: 'usd',
      // // image: "one url here",
      image:
        'https://cdn.shopify.com/s/files/1/2143/3217/products/500_3f527d72-404b-4db7-a96c-471d1f97256e.png?v=1595523310', // dummy data
      inventory: {
        type: 'finite',
        quantity: createSkuDto.quantity,
      },
    });
  }

  async activateStripeSku(sku: Sku) {
    // made blocking for now because not sure how to do each loop await
    return await this.stripeClient.skus.update(sku.id, {
      active: true,
    });
  }

  async deactivateStripeSku(sku: Sku) {
    // made blocking for now because not sure how to do each loop await
    return await this.stripeClient.skus.update(sku.id, {
      active: false,
    });
  }

  async createStripeOrder(createOrderDto: CreateOrderDto, user: User) {
    const shippingName = createOrderDto.shipping_name
      ? createOrderDto.shipping_name
      : `${user.first_name} ${user.last_name}`;
    const data: any = {
      currency: 'usd',
      customer: createOrderDto.user_id,
      items: [
        {
          type: 'sku',
          parent: createOrderDto.sku,
          quantity: createOrderDto.quantity,
        },
      ],
      // even tho stripe docs say if customer is attached the customer address
      // is used by default, so shipping address is optional,
      // testing with a customer with an address, I couldn't get this to work
      shipping: {
        address: {
          city: createOrderDto.shipping.city,
          country: createOrderDto.shipping.country,
          line1: createOrderDto.shipping.line1,
          line2: '' || createOrderDto.shipping.line2,
          postal_code: createOrderDto.shipping.postal_code,
          state: createOrderDto.shipping.state,
        },
        name: shippingName,
      },
    };
    if (createOrderDto.email) {
      data.email = createOrderDto.email;
    }

    return this.stripeClient.orders.create(data);
  }

  async payStripeOrder(orderId: string, customer: string) {
    // todo figure out how to directly pass card
    // as of now the customer must update primary payment method
    // to switch it for use on stripe
    return this.stripeClient.orders.pay(orderId, { customer: customer });
  }
}
