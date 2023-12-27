import { isDev } from '@lsk4/env';
import { Err } from '@lsk4/err';
import { log } from '@lsk4/log/log';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getSessionOptions } from '@nestlib/auth/getSessionOptions';
import { ConfigService } from '@nestlib/config';
import { AnyExceptionFilter, createNestLogger } from '@nestlib/utils';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import session from 'express-session';

import { RedisIoAdapter } from './api/RedisIoAdapter';
import { AppModule } from './AppModule.js';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: createNestLogger(),
  });
  const configService = app.get(ConfigService);

  const port = process.env.PORT || configService.get('webserver.port');
  if (!port) throw new Err('!config.webserver.port');
  if (configService.get('webserver.cors')) app.enableCors();
  const limit = configService.get('webserver.limit') || '100mb';
  app.set('trust proxy', 1);
  app.use(cookieParser());
  app.use(json({ limit }));
  app.use(urlencoded({ extended: true, limit }));
  app.use(session(getSessionOptions(app)));
  app.useGlobalFilters(new AnyExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  log.info(`⚡️ Server running on http://localhost:${port}`);

  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  if (configService.get('redis')) {
    const redisIoAdapter = new RedisIoAdapter(app);
    // console.log('asd', configService.get('redis'));
    await redisIoAdapter.connectToRedis(configService.get('redis'));
    app.useWebSocketAdapter(redisIoAdapter);
  }
}

main();
