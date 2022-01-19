import { Injectable } from '@nestjs/common';
import { authenticator, totp } from 'otplib';
import { HashAlgorithms } from '@otplib/core';

@Injectable()
export class TotpService {
  constructor() {
    totp.options = {
      algorithm: HashAlgorithms.SHA256,
      digits: 6,
      step: 60,
      window: [1, 0],
    };
  }

  generateSecret(): string {
    return authenticator.generateSecret();
  }

  generate(secret: string): string {
    return totp.generate(secret);
  }

  verify(secret: string, token) {
    return totp.verify({
      secret,
      token,
    });
  }
}
