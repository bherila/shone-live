import { StripeAddress } from "./stripe-address.dto";
import { StripeShippingAddress } from "./stripe-shipping-address.dto";

export interface CreateStripeCustomerResponseFields {
    id: string, // Unique identifier for the object
    stripeResponseJson: object,
}
