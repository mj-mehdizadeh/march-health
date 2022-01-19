import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (appConfigService: ConfigService) => ({
        uri: appConfigService.get('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
