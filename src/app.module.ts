import { Module } from '@nestjs/common';
import { BootstrapModule } from "./bootstrap/bootstrap.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BootstrapModule, AuthModule, UsersModule],
})
export class AppModule {}
