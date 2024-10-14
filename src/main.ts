import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import * as bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('HOST'),
  });

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 10,
    }),
  );
  await app.listen(3000);
}
bootstrap();
