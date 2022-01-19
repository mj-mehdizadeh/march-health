import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  setupSwagger(app);
  await app.listen(configService.get('PORT'));
  console.info(`Application is running on ${await app.getUrl()}`);
}

bootstrap();
