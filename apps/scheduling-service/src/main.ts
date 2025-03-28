import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  const port = configService.get('PORT', 3000)
  const nodeEnv = configService.get('NODE_ENV', 'development')

  console.log(`Stating application in ${nodeEnv}`
  )
  await app.listen(port);
}
bootstrap();
