import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsNumber()
  readonly userId: number;

  @IsOptional()
  @IsNumber()
  readonly productId?: number;

  @IsOptional()
  @IsNumber()
  readonly showId?: number;

  @IsString() // TODO: add custom validation from enum for valid models to have images
  readonly type: string;
}
