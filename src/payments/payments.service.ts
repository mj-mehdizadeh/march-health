import { Injectable, Req } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Payments, PaymentsDocument } from './payments.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payments.name) private paymentsModel: Model<PaymentsDocument>,
    private configService: ConfigService,
  ) {}

  create(createPaymentDto: { userId: string; plan: string }) {
    const code = Math.floor(Math.random() * 10000);
    return this.paymentsModel.create({
      ...createPaymentDto,
      code,
      paymentUrl: `${this.configService.get('PAYMENT_BASE_URL')}/${code}`,
    });
  }

  findAll(query: { userId?: string }) {
    const filter: FilterQuery<Payments> = {};
    if (query.userId) filter.userId = query.userId;
    return this.paymentsModel.find(filter);
  }

  findOne(id: string, filter?: { userId?: string }) {
    return this.paymentsModel.findOne({ _id: id, ...filter });
  }

  update(
    id: string,
    filter: { userId?: string },
    updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsModel.findOneAndUpdate(
      { _id: id, ...filter },
      updatePaymentDto,
      {
        new: true,
      },
    );
  }

  remove(id: string, filter?: { userId?: string }) {
    return this.paymentsModel.deleteOne({ _id: id, ...filter });
  }
}
