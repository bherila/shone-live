import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Address } from "src/addresses/entities/address.entity";

@Entity()
export class UserAddress {
    @ManyToOne(
        type => User,
        user => user.userAddresses,
        {
            cascade: ["insert", "update"],
            primary: true,
        }
    )
    user: User;

    @ManyToOne(
        type => Address,
        address => address.userAddresses,
        {
            cascade: ["insert", "update"],
            primary: true
        }
    )
    address: Address;
}
