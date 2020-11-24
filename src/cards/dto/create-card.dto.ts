import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({
    description: `the user id of the owner of the card in stripe`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsString()
  readonly user: string;

  @ApiProperty({
    description: `the card id returned from stripe
    (card creation should happen directly between the client and stripe.
    we just take the token, however we also want to save the address
    so that should be passed separately
    or we can add it to this endpoint if that's easier)`,
    example: `card_1HqnEC2eZvKYlo2Cs3wf41sM`,
  })
  @IsString()
  readonly stripeCardToken: string;
}
