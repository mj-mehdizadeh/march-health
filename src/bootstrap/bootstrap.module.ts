import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import validationSchema from './config.validation.schema';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
    MongoModule,
    MailModule,
  ],
  exports: [ConfigModule, MailModule],
})
export class BootstrapModule {}
