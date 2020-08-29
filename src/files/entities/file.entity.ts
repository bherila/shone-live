import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
import { Show } from "src/shows/entities/show.entity";

// todo make it work on AWS, won't be trivial
// maybe minio is easier for this since it supports
@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        comment: "the name of the file, must be unique"
    })
    name: string;

    @Column({
        comment: "the type of the associated object eg product, show, user"
    })
    type: string;

    @ManyToOne(
        type => User,
        user => user.files, // what is "file" within the User Entity
        {
            cascade: ["insert", "update"]
        }
    )
    user: User;

    @ManyToOne(
        type => Product,
        product => product.files, // what is "file" within the Product Entity
        {
            cascade: ["insert", "update"]
        }
    )
    product: Product;

    @ManyToOne(
        type => Show,
        show => show.files, // what is "file" within the Show Entity
        {
            cascade: ["insert", "update"]
        }
    )
    show: Show;
}
