import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Show } from '../../shows/entities/show.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
class PrivateFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;

  @ManyToOne(
    () => User,
    (owner: User) => owner.privateFiles,
  )
  public owner: User;

  @ManyToOne(
    type => Show,
    show => show.privateFiles,
    {
      cascade: ['insert', 'update'],
    },
  )
  show: Show;
}

export default PrivateFile;
