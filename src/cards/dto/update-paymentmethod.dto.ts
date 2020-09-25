import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMethodDto } from './create-paymentmethod.dto';

export class UpdatePaymentMethodDto extends PartialType(CreatePaymentMethodDto) { }
