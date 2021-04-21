import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateAuthDto {
  @ApiProperty({
    description: `Unique identifier for authenticatable object.
      For user its an email address.`,
  })
  @IsString()
  readonly identifier: string;

  @ApiProperty({
    description:
      "a secret passcode, for a user its a bcrypt salted user submitted string",
  })
  @IsString()
  readonly password: string;
}
