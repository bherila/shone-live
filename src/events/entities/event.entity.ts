import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Index(['name', 'type']) // example of compound index
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Index() // example of adding an index
    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>;
}