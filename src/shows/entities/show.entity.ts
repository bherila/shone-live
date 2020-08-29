import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { File } from "src/files/entities/file.entity";

@Entity()
export class Show {
    @PrimaryGeneratedColumn()
    id: number;

    // ALL DATE-TIME WILL BE STORED IN UTC
    // TODO: WE MUST TRANSFORM ALL LOCAL TIMEZONE ON THE SERVER
    @Column({
        comment: "datetime that show starts in eg 2020-12-01T00:00:00"
    })
    start: Date;

    @Column({
        comment: "anticipated/approximate length of show in seconds"
    })
    length: number;

    @Column({
        comment: "seller generated description of show"
    })
    description: string;

    // todo, may want to allow recurring show names
    @Column({
        comment: "seller generated name of show"
    })
    name: string;

    // if many to many we we use join table and note it on the owner
    // @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
    @ManyToOne(
        type => User,
        user => user.shows, // what is "show" within the User Entity
        {
            cascade: ["insert", "update"]
        }
    )
    user: User;

    @OneToMany(
        type => Product,
        product => product.show,  // what is "show" within the Product Entity
        {
            cascade: true
        }
    )
    products: Product[];

    @OneToMany(
        type => File,
        file => file.show,  // what is "show" within the File Entity
        {
            cascade: true
        }
    )
    files: File[];
}
