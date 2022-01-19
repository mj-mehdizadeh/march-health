import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { TotpService } from "./totp/totp.service";

const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private totpService: TotpService) {
  }

  async registerUser(email: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const totpSecret = await this.totpService.generateSecret();
    return this.usersService.create(email, hashedPassword, totpSecret);
  }
}
