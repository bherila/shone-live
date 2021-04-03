import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { CreateUserDto } from "../../users/dto/create-user.dto";

export class RegisterDto extends CreateUserDto {
  @ApiProperty({
    description: `a secret passcode, for a user its a bcrypt salted user
    submitted string`,
    example: `my password`,
  })
  @IsString()
  readonly password: string;
}
