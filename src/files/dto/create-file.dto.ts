import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  readonly userId: string;

  @IsOptional()
  @IsNumber()
  readonly productId?: number;

  @IsOptional()
  @IsNumber()
  readonly showId?: number;

  @IsString() // TODO: add custom validation from enum for valid models to have images
  readonly type: string;
}
