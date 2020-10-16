import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSkuDto {
  @IsString()
  readonly product: string; // product id

  @IsOptional() // shouldn't be optional now
  @IsNumber()
  readonly show: number; // show id

  @IsNumber()
  readonly price: number; // price in cents

  @IsOptional()
  @IsDateString()
  readonly active_at: string; // https://en.wikipedia.org/wiki/ISO_8601

  @IsOptional()
  @IsDateString()
  readonly inactive_at: string; // https://en.wikipedia.org/wiki/ISO_8601

  @IsOptional()
  @IsString()
  readonly attributes: string; // `any descriptive details that it permutes on eg {"size": "medium", "gender": "unisex"}`,

  @IsNumber()
  readonly quantity: number;
}
