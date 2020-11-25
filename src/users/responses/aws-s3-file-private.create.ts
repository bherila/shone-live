import { ApiProperty } from '@nestjs/swagger';

export class AwsS3PrivateFileCreateResponse {
  @ApiProperty({ description: `the S3 bucket generated key` })
  public readonly key: string;

  @ApiProperty({ description: `our database ID for the object` })
  public readonly id: number;

  @ApiProperty({ description: `the owner has the user nested with user id` })
  public readonly owner: { id: string };
}
