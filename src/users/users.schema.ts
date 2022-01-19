import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { AccountStatus, UsersType } from "./users.type";

export type UsersDocument = Users & Document;

@Schema({
  timestamps: true
})
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true })
  totpSecret: string;

  @Prop({ required: true, enum: UsersType, default: UsersType.USER })
  role: UsersType;

  @Prop({ default: AccountStatus.ACTIVE, enum: AccountStatus })
  status: AccountStatus;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
