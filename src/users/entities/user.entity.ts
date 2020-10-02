import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { File } from "src/files/entities/file.entity";
import { Show } from 'src/shows/entities/show.entity'
import { Product } from "src/products/entities/product.entity";
import { Card } from "src/cards/entities/card.entity";
import { Order } from "src/orders/entities/order.entity";
import { UserAddress } from "src/user-addresses/user-address.entity";

// comments not yet supported by typeorm for psql, but can leave as notes for now
@Entity() // sql table === 'user'
export class User {
    @PrimaryColumn({
        comment: "stripe id is used to match 1 to 1"
    })
    id: string;

    @Column({
        unique: true,
        comment: "display username for use in the app"
    })
    username: string;

    @Column({
        comment: "bcrypt salted user submitted password"
    })
    password: string;


    @Column({
        comment: "users first name"
    })
    first_name: string;

    @Column({
        comment: "users last name"
    })
    last_name: string;

    @Column({
        unique: true,
        comment: "users phone number"
    })
    phone: string;

    @Column({
        comment: "used for various authorizations sellers must be validated"
    })
    seller: boolean;

    @Column({
        unique: true,
        comment: "email used for unique user identification"
    })
    email: string;

    // TODO: add address and then address association

    @OneToMany(
        type => Card,
        card => card.user,
        {
            cascade: true
        }
    )
    cards: Card[];

    @OneToMany(
        type => Show,
        show => show.user,
        {
            cascade: true
        }
    )
    shows: Show[];

    @OneToMany(
        type => Product,
        product => product.user,
        {
            cascade: true
        }
    )
    products: Product[];

    @OneToMany(
        type => File,
        file => file.user,
        {
            cascade: true
        }
    )
    files: File[];

    @OneToMany(
        order => Order,
        order => order.user
    )
    orders: Order[];


    @OneToMany(
        type => UserAddress,
        userAddress => userAddress.user,
        {
            cascade: true,
        }
    )
    userAddresses: UserAddress[];
}
