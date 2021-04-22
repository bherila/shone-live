import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: `Although auth use identifier other than email,
    for login we only use email`,
    example: `myemail@gmail.com`,
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description:
      "a secret passcode, for a user its a bcrypt salted user submitted string",
    example: `my password`,
  })
  @IsString()
  readonly password: string;
}
