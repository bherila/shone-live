import { IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  readonly user: string;

  @IsString()
  readonly stripeCardToken: string;
}
