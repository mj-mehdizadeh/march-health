import { Module } from '@nestjs/common';
import { TotpService } from './totp/totp.service';

@Module({
  imports: [],
  providers: [TotpService]
})
export class AuthModule {}
