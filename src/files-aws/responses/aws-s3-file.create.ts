import { ApiProperty } from '@nestjs/swagger';

export class AwsS3FileCreateResponse {
  @ApiProperty({ description: `the URL for the avatar image on S3` })
  public readonly url: string;

  @ApiProperty({ description: `the S3 bucket generated key` })
  public readonly key: string;

  @ApiProperty({ description: `our database ID for the object` })
  public readonly id: number;
}
