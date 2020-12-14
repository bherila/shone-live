// note the current return value is offered for convenience
// requested by client
//   https://piki-inc.slack.com/archives/C01E0AH2PFH/p1606429960000100?thread_ts=1606410553.000600&cid=C01E0AH2PFH
// there are valid reasons to not return the user
//   when issuing and returning a token
// softwareengineering.stackexchange.com/questions/419384
// (Should I return user data in an authentication endpoint using JWT?)

import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/user.entity';

export class JwtResponseWithUser {
  @ApiProperty({
    description: `the access token as a JWT string
  see https://jwt.io/introduction/`,
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19JWVVwb1RrUXV6bHU3ayIsInVzZXJuYW1lIjpudWxsLCJpYXQiOjE2MDc3NDAwOTIsImV4cCI6MTYwODk0OTY5Mn0.IOdxnz73Ru1wLBqFlSTcg00AhyU0Lz6tmQsKoEbxj7A`,
    type: `JWT`,
    required: true,
  })
  public readonly access_token: string;

  @ApiProperty({
    description: `the user who owns this token`,
    example: `cus_IPqRS333voIGbS`,
    required: true,
  })
  public readonly user_id?: string;

  @ApiProperty({
    description: `display username for use in the app.
    must be unique across users`,
    example: `my_username_without_spaces`,
    required: false,
  })
  public readonly username?: string;

  @ApiProperty({
    description: `users first name`,
    example: 'John',
    required: false,
  })
  public readonly first_name?: string;

  @ApiProperty({
    description: `users last name`,
    example: 'Smith',
    required: false,
  })
  public readonly last_name?: string;

  @ApiProperty({
    description: `users phone number`,
    example: '555-555-1234',
    required: false,
  })
  public readonly phone?: string;

  @ApiProperty({
    description: `whether or not the user is a seller
    parts of the API are restricted to sellers`,
    example: `true`,
    required: false,
  })
  public readonly seller?: boolean;

  @ApiProperty({
    description: `email used for unique user identification`,
    example: 'myemail@gmail.com',
    required: true,
  })
  public readonly email: string;

  constructor(user: User, access_token: string) {
    this.access_token = access_token;
    this.user_id = user.id;
    this.username = user.username;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.phone = user.phone;
    this.seller = user.seller;
    this.email = user.email;
  }
}
