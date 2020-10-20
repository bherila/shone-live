import { PartialType } from '@nestjs/swagger';

import { CreatePaymentMethodDto } from './create-paymentmethod.dto';

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {}
