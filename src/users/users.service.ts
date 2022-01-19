import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users, UsersDocument } from "./users.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private accountModel: Model<UsersDocument>,
  ) {
  }

  create(email: string, password: string, totpSecret: string) {
    return this.accountModel.create({
      email,
      password,
      totpSecret
    });
  }

  getById(id: string) {
    return this.accountModel.findById(id);
  }

  getByEmail(email: string) {
    return this.accountModel.findOne({ email });
  }

  deleteAccount(id: string) {
    return this.accountModel.deleteOne({ _id: id });
  }
}
