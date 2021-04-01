import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../../users/entities/user.entity";

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    comment: `unique identifier for authenticatable object.
      For user its an email address`,
  })
  identifier: string;

  @Column({
    comment:
      "a secret passcode, for a user its a bcrypt salted user submitted string",
  })
  password: string;

  @ManyToOne((type) => User, (user) => user.auths, {
    cascade: ["insert", "update"],
    onDelete: "CASCADE",
  })
  user: User;
}
