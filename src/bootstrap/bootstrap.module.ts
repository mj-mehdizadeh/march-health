import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import validationSchema from "./config.validation.schema"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      validationSchema
    }),
    MongoModule,
  ],
  exports: [ConfigModule],
})
export class BootstrapModule {}
