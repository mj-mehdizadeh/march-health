import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TotpService } from './totp/totp.service';
import { JwtService } from '@nestjs/jwt';
import { UsersDocument } from '../users/users.schema';
import { UsersStatus } from '../users/users.type';
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private totpService: TotpService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registerUser(email: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const totpSecret = await this.totpService.generateSecret();
    return this.usersService.create(email, hashedPassword, totpSecret);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (
      user &&
      user.status === UsersStatus.ACTIVE &&
      (await bcrypt.compare(password, user.hashedPassword))
    ) {
      return user;
    }
    return null;
  }

  totpToken(user: UsersDocument) {
    return this.totpService.generate(user.totpSecret);
  }

  verifyTotp(user: UsersDocument, token: string) {
    return this.totpService.verify(user.totpSecret, token);
  }

  async login(user: UsersDocument) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('JWT_EXPIRE_IN') || '15m',
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
