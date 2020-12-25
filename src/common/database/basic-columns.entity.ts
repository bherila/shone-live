import { Exclude } from 'class-transformer';
import {
  Column, CreateDateColumn, DeleteDateColumn, Generated, Index,
  PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn,
} from 'typeorm';

export class BasicColumns {
  @PrimaryGeneratedColumn({
    comment: 'private internal ID, actual primary key',
  })
  @Exclude() // must call @UseInterceptors(ClassSerializerInterceptor)
  // on the controller class (or method)
  // to exclude this field by default from the response
  _id: number;

  @Index()
  @Column({
    comment: 'public ID, for use by client (is a UUID)',
  })
  @Generated('uuid')
  id: string;

  // don't set these columns - they are automatically set.
  // github.com/typeorm/typeorm/blob/master/docs/entities.md#special-columns
  @CreateDateColumn({
    comment:
      `@CreateDateColumn is a special column ` +
      `that is automatically set to the entity's insertion date. `,
  })
  public readonly created_at: Date;

  @UpdateDateColumn({
    comment:
      `@UpdateDateColumn is a special column ` +
      `that is automatically set to the entity's update time `,
  })
  public readonly updated_at: Date;

  @DeleteDateColumn({
    comment:
      `@DeleteDateColumn is a special column ` +
      `that is automatically set to the entity's delete time ` +
      `each time you call soft-delete of entity manager or repository. `,
  })
  public readonly deleted_at: Date;

  @VersionColumn({
    comment:
      `@VersionColumn is a special column ` +
      `that is automatically set to the version of the entity ` +
      `(incremental number) ` +
      `each time you call save of entity manager or repository. `,
  })
  public readonly version: Number;
}
