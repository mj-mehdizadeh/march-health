import { ApiProperty } from '@nestjs/swagger';
import { PaymentsStatus } from '../payments.type';

export class PaymentDto {
  @ApiProperty()
  id: string;
  @ApiProperty({ enum: PaymentsStatus })
  status: PaymentsStatus;
  @ApiProperty()
  code: string;
  @ApiProperty()
  plan: string;
  @ApiProperty()
  paymentUrl: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
