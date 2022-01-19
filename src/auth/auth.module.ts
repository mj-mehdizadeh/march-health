import { Module } from '@nestjs/common';
import { TotpService } from './totp/totp.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./jwt/jwt.strategy";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [TotpService, JwtStrategy],
})
export class AuthModule {}
