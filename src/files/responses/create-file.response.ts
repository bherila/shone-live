import { File } from '../../files/entities/file.entity';

export class CreateFileResponse {
  public id: string;
  public user_id: string;
  public url: string;
  public is_public: boolean;

  constructor(file: File) {
    this.id = file.id;
    if (file.user) {
      this.user_id = file.user.id;
    }
    this.is_public = file.is_public;
    if (file.is_public) {
      this.url = file.url;
    }
  }
}
