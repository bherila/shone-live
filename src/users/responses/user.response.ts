import { ApiProperty } from '@nestjs/swagger';
import { User } from '@sentry/node';

export class UserResponse {
  @ApiProperty({
    description: `the id of the user`,
    example: `cus_IPqRS333voIGbS`,
  })
  public readonly id: string;

  @ApiProperty({
    description: `display username for use in the app.
    must be unique across users`,
    example: `my_username_without_spaces`,
  })
  public readonly username?: string;

  @ApiProperty({
    description:
      `descriptive bio for use in the app. ` +
      `target is for sellers to describe themselves`,
    example:
      `My obsession with plants began deep in ` +
      `the Amazon rainforest 20 years ago.` +
      `Since then I've been selling some of the worlds most rare orchids.`,
  })
  public readonly bio?: string;

  @ApiProperty({
    description: `users first name`,
    example: 'John',
  })
  public readonly first_name?: string;

  @ApiProperty({
    description: `users last name`,
    example: 'Smith',
  })
  public readonly last_name?: string;

  @ApiProperty({
    description: `users phone number`,
    example: '555-555-1234',
  })
  public readonly phone?: string;

  @ApiProperty({
    description: `email used for unique user identification`,
    example: 'myemail@gmail.com',
  })
  public readonly email: string;

  @ApiProperty({
    description: `used for various authorizations sellers must be validated`,
    example: true,
  })
  public readonly seller?: boolean;

  @ApiProperty({
    description: `the url of the avatar image for the user`,
    example:
      'https://piki-uploads.s3.us-west-1.amazonaws.com/d00b692e-c6d4-44cf-b0ef-6982a5657c55-favicon.ico',
  })
  public readonly avatar_url?: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.bio = user.bio;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.phone = user.phone;
    this.seller = user.seller;
    this.email = user.email;
    this.avatar_url = user.avatar?.url || null;
  }
}
