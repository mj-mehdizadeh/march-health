import { PartialType } from '@nestjs/swagger';
import { PaymentDto } from './payment.dto';

export class UpdatePaymentDto extends PartialType(PaymentDto) {}
