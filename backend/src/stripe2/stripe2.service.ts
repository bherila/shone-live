import { string } from "@hapi/joi";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Stripe } from "stripe";

import { ShowGateway } from "../shows/show.gateway";
import { SimpleProduct } from "../simple-products/entities/simple-product.entity";
import { SimpleProductsService } from "../simple-products/simple-products.service";
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";

@Injectable()
export class Stripe2Service {
  private stripeClient: Stripe;

  CHECKOUT_CONFIGURATION: any = {
    mode: "payment",
    payment_method_types: ["card"],
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
    shipping_address_collection: { allowed_countries: ["US"] },
  };

  // TODO we need a DB table to save all webhooks data
  public constructor(
    @Inject(forwardRef(() => SimpleProductsService))
    private readonly simpleProductsService: SimpleProductsService,
    private readonly showGateway: ShowGateway
  ) {
    this.stripeClient = new Stripe(process.env.STRIPE_DEV_KEY, {
      apiVersion: "2020-08-27",
    });
  }

  async createStripeProduct(
    simpleProduct: SimpleProduct,
    images: string[]
  ): Promise<Stripe.Response<Stripe.Product>> {
    return this.stripeClient.products.create({
      id: simpleProduct.id,
      name: simpleProduct.name,
      images: images,
    });
  }

  async createStripePrice(
    simpleProduct: SimpleProduct
  ): Promise<Stripe.Response<Stripe.Price>> {
    return this.stripeClient.prices.create({
      currency: "USD",
      unit_amount: simpleProduct.price,
      product: simpleProduct.id,
    });
  }

  async createCheckoutSession(
    createCheckoutSessionDto: CreateCheckoutSessionDto
  ) {
    const { simple_product_id, user_id, quantity } = createCheckoutSessionDto;
    return this.stripeClient.checkout.sessions
      .create({
        line_items: [await this.stripeLineItem(simple_product_id, quantity)],
        customer: user_id,
        ...this.CHECKOUT_CONFIGURATION,
      })
      .then((checkoutSession) => checkoutSession.id);
  }

  async stripeLineItem(simple_product_id: string, quantity: number) {
    const item: any = { price: string, quantity: quantity };
    return this.simpleProductsService
      .findOne(simple_product_id)
      .then((simpleProduct) => {
        item.price = simpleProduct.stripe_price_id;
        return item;
      });
  }

  async handleStripeEvent(signature: any, request: any) {
    try {
      const event = this.stripeClient.webhooks.constructEvent(
        request.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      const { data, type } = event;
      if (type === "checkout.session.completed") {
        this.handleCheckoutSessionCompleted(data);
      }
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      // should call sentry here
    }
  }

  async handleCheckoutSessionCompleted(data: Stripe.Event.Data) {
    this.stripeClient.checkout.sessions
      .listLineItems(data.object["id"])
      .then((lineItems) => {
        lineItems.data.map((item) => {
          this.simpleProductsService
            .updateQuantitySold(item.price.product.toString(), item.quantity)
            .then((res) => this.showGateway.handleShowSales(res));
        });
      });
  }
}
