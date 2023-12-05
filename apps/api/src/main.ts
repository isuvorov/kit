import { isDev } from '@lsk4/env';
import { Err } from '@lsk4/err';
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

import { AppModule } from './AppModule.js';

async function main() {
  const logger = createNestLogger();
  // @ts-ignore
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger });
  const configService = app.get(ConfigService);

  const port = process.env.PORT || configService.get('webserver.port');
  if (!port) throw new Err('!config.webserver.port');
  if (port) {
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
    logger.info(`⚡️ Server running on http://localhost:${port}`, 'main');
  }

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
}

main();
