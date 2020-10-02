import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { CreateSkuDto } from 'src/skus/dto/create-sku.dto';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { Sku } from 'src/skus/entities/sku.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';

@Injectable()
export class StripeService {
    stripeClient: Stripe;

    public constructor() {
        this.stripeClient = new Stripe(
            process.env.STRIPE_DEV_KEY, {
            apiVersion: '2020-08-27',
        });
        if (process.env.NODE_ENV === 'dev') {
            console.info('you are in DEV mode: Stripe client was loaded', this.stripeClient["_api"]);
        }
    };

    // data transformation helpers
    // stripe uses unix epoch timestamp, our database uses ISO
    secondsToISOString(seconds: number): string {
        const date = new Date(seconds * 1000);
        return date.toISOString();
    };

    // stripe uses unix epoch timestamp, our database uses ISO
    secondsToDate(seconds: number): Date {
        return new Date(seconds * 1000);
    };

    // todo figure out how to get stripe typings to make this require a stripe card object
    getAddressFromCard(stripeCard: any): CreateAddressDto {
        let data: CreateAddressDto = {
            "city": stripeCard.address_city,
            "country": stripeCard.address_country,
            "line1": stripeCard.address_line1,
            "state": stripeCard.address_state,
            "postal_code": stripeCard.address_zip,
        };
        if (stripeCard.address_line2) {
            data.line2 = stripeCard.address_line2;
        }

        const keys = Object.keys(data);
        const missingValues: any = [];
        keys.forEach((key) => (data[key] == null) && missingValues.push(key));
        if (missingValues.length > 0) {
            throw new HttpException(`Cannot save card info missing address data. Missing fields: ${missingValues}`, HttpStatus.BAD_REQUEST);
        }

        return data;
    }

    getAddressFromOrder(stripeOrder: any): CreateAddressDto {
        let data: CreateAddressDto = {
            "city": stripeOrder.shipping.address.city,
            "country": stripeOrder.shipping.address.country,
            "line1": stripeOrder.shipping.address.line1,
            "state": stripeOrder.shipping.address.state,
            "postal_code": stripeOrder.shipping.address.postal_code,
        };
        if (stripeOrder.shipping.address.line2) {
            data.line2 = stripeOrder.shipping.address.line2;
        }
        return data;
    }

    // all interfaces from piki to stripe
    createStripeCustomer(createUserDto: CreateUserDto) {
        const data = this.formatCustomerData(createUserDto)
        return this.stripeClient.customers.create(data);
    };

    updateStripeCustomer(updateUserDto: UpdateUserDto) {
        const data = this.formatCustomerData(updateUserDto)
        return this.stripeClient.customers.update(data);
    };

    formatCustomerData(customerData: CreateUserDto | UpdateUserDto) {
        let data: any = {};
        data.address = customerData.address;
        data.email = customerData.email;
        data.name = `${customerData.first_name} ${customerData.last_name}`;
        data.phone = customerData.phone;
        data.shipping = customerData.shipping;
        data.payment_method = customerData.paymentMethod;
        const keys = Object.keys(data);
        keys.forEach((key) => (data[key] == null) && delete data[key]);
        return data;
    };

    async createStripeCard(user: string, cardToken: string) {
        return this.stripeClient.customers.createSource(user, { source: cardToken });
    }

    async createStripeProduct(product: CreateProductDto, showId: number, showDate: string) {
        return this.stripeClient.products.create({
            name: product.name,
            active: true, // todo: update to false after show is done
            description: product.description,
            type: "good",
            shippable: true,
            // images: ["some urls here"], // file path ...todo once files are saving path not just name // dummy data
            images: ["https://cdn.shopify.com/s/files/1/2143/3217/products/500_3f527d72-404b-4db7-a96c-471d1f97256e.png?v=1595523310"], // dummy data
            metadata: {
                "product_creator_user_id": product.userId,
                "show_id": showId,
                "show_date": showDate,
            },
        });
    };

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
            currency: "usd",
            // // image: "one url here",
            image: "https://cdn.shopify.com/s/files/1/2143/3217/products/500_3f527d72-404b-4db7-a96c-471d1f97256e.png?v=1595523310", // dummy data
            inventory: {
                type: "finite",
                quantity: createSkuDto.quantity,
            },
        })
    };

    async activateStripeSku(sku: Sku) {
        // made blocking for now because not sure how to do each loop await
        return await this.stripeClient.skus.update(
            sku.id,
            {
                active: true
            });
    };

    async deactivateStripeSku(sku: Sku) {
        // made blocking for now because not sure how to do each loop await
        return await this.stripeClient.skus.update(
            sku.id,
            {
                active: false
            });
    };

    async createStripeOrder(createOrderDto: CreateOrderDto, user: User) {
        let shippingName = (
            createOrderDto.shipping_name ? createOrderDto.shipping_name :
                `${user.first_name} ${user.last_name}`
        );
        let data: any = {
            currency: 'usd',
            customer: createOrderDto.user,
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
                    line2: "" || createOrderDto.shipping.line2,
                    postal_code: createOrderDto.shipping.postal_code,
                    state: createOrderDto.shipping.state
                },
                name: shippingName,
            }
        };
        if (createOrderDto.email) { data.email = createOrderDto.email; }

        return this.stripeClient.orders.create(data);
    };

    async payStripeOrder(orderId: string, customer: string) {
        // todo figure out how to directly pass card
        // as of now the customer must update primary payment method
        // to switch it for use on stripe
        return this.stripeClient.orders.pay(orderId, { customer: customer });
    };


    // async createStripePaymentMethod(createPaymentMethodDto: CreatePaymentMethodDto) {
    //     // todo: return the stripe card errors to the client
    //     const paymentMethod = await this.stripeClient.paymentMethods.create({
    //         type: 'card',
    //         card: {
    //             number: createPaymentMethodDto.number,
    //             exp_month: createPaymentMethodDto.exp_month,
    //             exp_year: createPaymentMethodDto.exp_year,
    //             cvc: createPaymentMethodDto.cvc,
    //         },
    //         billing_details: {
    //             address: createPaymentMethodDto.address,
    //             name: createPaymentMethodDto.name, // add if optional
    //         }
    //     });

    //     await this.stripeClient.paymentMethods.attach(
    //         paymentMethod.id,
    //         { customer: createPaymentMethodDto.user }
    //     );

    //     return paymentMethod;
    // };

    // async createStripePaymentIntent(amount: number, card: string, user: string) {
    //     return this.stripeClient.paymentIntents.create({
    //         amount: amount,
    //         currency: "usd",
    //         confirm: true,
    //         customer: user,
    //         metadata: { "show": "todo" },
    //         payment_method: card
    //     });
    // }

}
