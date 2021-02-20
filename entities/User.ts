import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  firstname: string

  @Column('text')
  lastname: string

  @Column('text')
  email: string

  @Column('text')
  password: string
}

export default User;
