import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { PaymentsStatus } from './payments.type';

export type PaymentsDocument = Payments & Document;

@Schema({
  timestamps: true,
})
export class Payments {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  userId: ObjectId;

  @Prop()
  plan: string;

  @Prop()
  code: string;

  @Prop({ default: PaymentsStatus.NEW, enum: PaymentsStatus })
  status: PaymentsStatus;
}

export const PaymentsSchema = SchemaFactory.createForClass(Payments);
