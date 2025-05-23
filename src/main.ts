import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://optiprime.koelsmartenergy.com/',
      'https://optiprime.koelsmartenergy.com',
      'https://www.optiprime.koelsmartenergy.com',
      'https://www.optiprime.koelsmartenergy.com/',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
  });
  await app.listen(5070);
}
bootstrap();
