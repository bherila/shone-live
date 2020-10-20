import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'the marketing name for the coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'the name of the company that makes the coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({
    description: 'a list of available flavorings as an array',
    example: ['hazelnut', 'mocha'],
  })
  @IsString({ each: true })
  readonly flavors: string[];
}
