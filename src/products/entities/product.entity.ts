import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Show } from 'src/shows/entities/show.entity';
import { File } from "src/files/entities/file.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: "product name",
    })
    name: string;

    @Column({
        comment: "product description",
    })
    description: string;

    @Column({
        comment: "base retail price for the show",
    })
    price: number;

    @Column({
        comment: "quantity available to sell for associated show",
    })
    quantity: number;

    // if many to many we we use join table and note it on the owner
    // @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
    @ManyToOne(
        type => User,
        user => user.products, // what is "product" within the User Entity
        {
            cascade: ["insert", "update"]
        }
    )
    user: User;

    @ManyToOne(
        type => Show,
        show => show.products,
        {
            cascade: ["insert", "update"]
        }
    )
    show: Show;

    @OneToMany(
        type => File,
        file => file.product,  // what is "product" within the File Entity
        {
            cascade: true
        }
    )
    files: File[];
}
