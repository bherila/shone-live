// note the current return value is offered for convenience
// requested by client
//   https://piki-inc.slack.com/archives/C01E0AH2PFH/p1606429960000100?thread_ts=1606410553.000600&cid=C01E0AH2PFH
// there are valid reasons to not return the user
//   when issuing and returning a token
// softwareengineering.stackexchange.com/questions/419384
// (Should I return user data in an authentication endpoint using JWT?)

import { ApiProperty } from "@nestjs/swagger";

import { User } from "../../users/entities/user.entity";
import { UserResponse } from "../../users/responses/user.response";

export class JwtResponseWithUser extends UserResponse {
  @ApiProperty({
    description: `the access token as a JWT string
  see https://jwt.io/introduction/`,
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19JWVVwb1RrUXV6bHU3ayIsInVzZXJuYW1lIjpudWxsLCJpYXQiOjE2MDc3NDAwOTIsImV4cCI6MTYwODk0OTY5Mn0.IOdxnz73Ru1wLBqFlSTcg00AhyU0Lz6tmQsKoEbxj7A`,
    type: `JWT`,
    required: true,
  })
  public readonly access_token: string;

  constructor(user: User, access_token: string) {
    super(user);
    this.access_token = access_token;
  }
}
