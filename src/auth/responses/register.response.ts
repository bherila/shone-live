import { IsJWT } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty({ description: `the JWT for the user just registered` })
  @IsJWT()
  public readonly access_token: string;
}
