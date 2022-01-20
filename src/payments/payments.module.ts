import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payments, PaymentsSchema } from './payments.schema';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payments.name, schema: PaymentsSchema },
    ]),
  ],
  controllers: [PaymentsController, AdminController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
