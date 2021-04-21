import { Entity, ManyToOne } from "typeorm";

import { Address } from "../addresses/entities/address.entity";
import { User } from "../users/entities/user.entity";

// TODO if we keep address model we should move this in there
// and reference it from there inside stripe
@Entity()
export class UserAddress {
  @ManyToOne((type) => User, (user) => user.userAddresses, {
    cascade: ["insert", "update"],
    primary: true,
  })
  user: User;

  @ManyToOne((type) => Address, (address) => address.userAddresses, {
    cascade: ["insert", "update"],
    primary: true,
  })
  address: Address;
}
