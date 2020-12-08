import { IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePrivateFileDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    description: `a single file sent as multipart/form-data
          server expects this param to be called 'file'
          the format can be any kind we do not validate it or process it
          the file simply goes up to the AWS S3 bucket and is saved there`,
    example: `'file': <any-kind-of-binary-file>`,
  })
  public readonly file: any;

  @ApiProperty({
    description: `the id of the user who uploaded this file
          we need this user id to associate the user so we can
          1. let only this user delete the file
          2. be able to return all this users files for them to manage`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsString()
  public readonly user_id: string;

  @ApiProperty({
    description: `the id of the product associated with the image`,
    example: `prod_IRMTtITbqdjXVn`,
  })
  @IsOptional()
  @IsString()
  public readonly product_id?: string;

  @ApiProperty({
    description: `the id of the sku associated with the image`,
    example: `sku_IRMW5E3niKt154`,
  })
  @IsOptional()
  @IsString()
  public readonly sku_id?: string;

  @ApiProperty({
    description: `the id of the show associated with the file`,
    example: `1`,
  })
  @IsOptional()
  @IsNumber()
  public readonly show_id?: number;

  @ApiProperty({
    description: `type of object this file is associated with, must be:
    Product, Show or Sku`,
    example: `Show`,
  })
  @IsString()
  // TODO: add custom validation from enum for valid models to have images
  public readonly type: string;
}
