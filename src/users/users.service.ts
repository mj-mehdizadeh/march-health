import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  create(email: string, hashedPassword: string, totpSecret: string) {
    return this.usersModel.create({
      email,
      hashedPassword,
      totpSecret,
    });
  }

  getById(id: string) {
    return this.usersModel.findById(id);
  }

  getByEmail(email: string) {
    return this.usersModel.findOne({ email });
  }

  deleteAccount(id: string) {
    return this.usersModel.deleteOne({ _id: id });
  }
}
