import { Module } from '@nestjs/common';
import { TotpService } from './totp/totp.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [TotpService, JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
