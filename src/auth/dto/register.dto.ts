import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { CreateUserDto } from '../../users/dto/create-user.dto';

export class RegisterDto {
  @ApiProperty({
    description: `a secret passcode, for a user its a bcrypt salted user
    submitted string`,
    example: `my password`,
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: `currently a user must be passed in
    because all auth must now be associated with a user.
    When we support multiple auth per user,
    then user id will be available as an option instead`,
    example: {
      id: 'cus_I710o5QGkr26Ht',
      username: 'test user 1',
      first_name: 'bretton',
      last_name: 'auerbach',
      phone: '7188583077',
      seller: true,
      email: 'abcd@me.co',
    },
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  readonly user: CreateUserDto;
}
