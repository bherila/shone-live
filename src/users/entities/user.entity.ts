import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { File } from "src/files/entities/file.entity";
import { Show } from 'src/shows/entities/show.entity'
import { Product } from "src/products/entities/product.entity";

// comments not yet supported by typeorm for psql, but can leave as notes for now
@Entity() // sql table === 'user'
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        comment: "display username for use in the app"
    })
    username: string;

    @Column({
        comment: "bcrypt salted user submitted passord"
    })
    password: string;

    @Column({
        comment: "used for various authorizations sellers must be validated"
    })
    seller: boolean;

    @Column({
        unique: true,
        comment: "email used for unique user identification"
    })
    email: string;

    @OneToMany(
        type => Show,
        show => show.user,  // what is "user" within the Show Entity
        {
            cascade: true
        }
    )
    shows: Show[];

    @OneToMany(
        type => Product,
        product => product.user,  // what is "user" within the Product Entity
        {
            cascade: true
        }
    )
    products: Product[];

    @OneToMany(
        type => File,
        file => file.user,  // what is "user" within the File Entity
        {
            cascade: true
        }
    )
    files: File[];
}
