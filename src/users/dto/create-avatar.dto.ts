import { IsString } from 'class-validator';

export class CreateAvatarDto {
  @IsString()
  readonly userId: string;
}
