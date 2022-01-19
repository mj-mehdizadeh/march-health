import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UsersStatus, UsersRole } from './users.type';
import { toJSON } from '../common/lib/schema';

export type UsersDocument = Users & Document;

@Schema({
  timestamps: true,
  toJSON,
})
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  hashedPassword: string;

  @Prop({ required: true })
  totpSecret: string;

  @Prop({ required: true, enum: UsersRole, default: UsersRole.USER })
  role: UsersRole;

  @Prop({ default: UsersStatus.ACTIVE, enum: UsersStatus })
  status: UsersStatus;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
