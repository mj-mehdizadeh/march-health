import { ApiProperty } from '@nestjs/swagger';
import { PaymentsStatus } from '../payments.type';

export class UpdatePaymentDto {
  @ApiProperty({ enum: PaymentsStatus })
  status: PaymentsStatus;
  @ApiProperty()
  code: string;
  @ApiProperty()
  plan: string;
  @ApiProperty()
  paymentUrl: string;
}
