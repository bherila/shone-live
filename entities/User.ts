import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  firstName: string

  @Column('text')
  lastName: string

  @Column('text')
  email: string

  @Column('text')
  passwordSalt: string

  @Column('text')
  passwordHash: string
}

export default User
