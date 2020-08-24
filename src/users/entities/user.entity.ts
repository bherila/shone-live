import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() // sql table === 'user'
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    seller: boolean;

    @Column({ unique: true })
    email: string;
}
