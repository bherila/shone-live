import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
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
}
