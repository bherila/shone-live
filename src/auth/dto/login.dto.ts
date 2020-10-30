import { IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: `Although auth use identifier other than email,
    for login we only use email`,
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description:
      'a secret passcode, for a user its a bcrypt salted user submitted string',
  })
  @IsString()
  readonly password: string;
}
