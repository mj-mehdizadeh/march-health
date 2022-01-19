import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UsersStatus, UsersType } from "./users.type";

export type UsersDocument = Users & Document;

@Schema({
  timestamps: true
})
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  hashedPassword: string;

  @Prop({ required: true })
  totpSecret: string;

  @Prop({ required: true, enum: UsersType, default: UsersType.USER })
  role: UsersType;

  @Prop({ default: UsersStatus.ACTIVE, enum: UsersStatus })
  status: UsersStatus;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
