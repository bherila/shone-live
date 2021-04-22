import { ApiProperty } from "@nestjs/swagger";

export class CreateCheckoutSessionResponse {
  @ApiProperty({
    description: `The sessionId is needed for the stripe redirect
        to the checkout page they host for us`,
    example: `cs_test_a1zDGan5HlewKPzDjIUWnyHo2DXyDmHpTj9XLDeS7RTbQDp8vTvFdm0bOT`,
  })
  public readonly sessionId: string;

  constructor(id) {
    this.sessionId = id;
  }
}
