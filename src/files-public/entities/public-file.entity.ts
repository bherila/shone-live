import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// todo we should always store user who created on this
// (or maybe that should only be for private files) check it
// review the id/key/url distinction from article
// also should have associated object
// (or maybe that should only be for private files) check it
@Entity()
export class PublicFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;
}
