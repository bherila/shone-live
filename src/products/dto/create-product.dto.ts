import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly userId: string;

  @IsNumber()
  readonly showId: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
