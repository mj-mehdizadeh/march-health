import { Injectable, Req } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Payments, PaymentsDocument } from './payments.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payments.name) private paymentsModel: Model<PaymentsDocument>,
  ) {}

  create(createPaymentDto: { userId: string; plan: string }) {
    return this.paymentsModel.create({
      ...createPaymentDto,
      code: Math.floor(Math.random() * 10000),
    });
  }

  findAll(query: { userId?: string }) {
    const filter: FilterQuery<Payments> = {};
    if (query.userId) filter.userId = query.userId;
    return this.paymentsModel.find(filter);
  }

  findOne(id: number) {
    return this.paymentsModel.findById(id);
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsModel.findByIdAndUpdate(id, updatePaymentDto, {
      new: true,
    });
  }

  remove(id: number) {
    return this.paymentsModel.deleteOne({ _id: id });
  }
}
