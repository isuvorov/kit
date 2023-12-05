import { isDev } from '@lsk4/env';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { BotService } from './bot/bot.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { AccessLoggerMiddleware } from '@nestlib/access-logger';
import { AuthGuard } from '@nestlib/auth/AuthGuard';
import { ConfigModule, getConfig, loadConfigEnvs } from '@nestlib/config';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';
import { S3Module } from 'nestjs-s3';

import { ApiController } from './api/ApiController';
import { ListController } from './api/ListController';
import { ProductsController } from './api/ProductsController';
import { TestController } from './api/TestController';
// import { ApiController } from './api/ApiController';
// import { ProductController } from './api/ProductController';
// import { TelegramAvartarController } from './api/TelegramAvartarController';
// import { BotAppService } from './BotAppService';
// import { AuthController } from './lskjs/auth/AuthController';
// import { AuthOtpService } from './lskjs/auth/AuthOtpService';
// import { AuthService } from './lskjs/auth/AuthService';
import models from './nestlib/auth/models';
import { loggerFactory } from './nestlib/mikro-orm/loggerFactory';

const notNull = (v, def) => (v == null ? def : v);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env', '../.env', '../../.env'],
    }),
    ConfigModule.forRoot(
      loadConfigEnvs(['process.env.ENV_JSON', '.env.js', '../.env.js', '../../.env.js']),
    ),
    // CacheModule.registerAsync(
    //   getConfig('redis', (cnf) => ({
    //     store: redisStore,
    //     ...cnf,
    //   })),
    // ),
    MikroOrmModule.forRootAsync(
      getConfig('dbs.mongodb', (cnf) => ({
        type: 'mongo',
        clientUrl: cnf.uri,
        entities: models,
        debug: notNull(cnf.debug, isDev),
        loggerFactory,
      })),
    ),
    MikroOrmModule.forFeature({ entities: models }),

    // MikroOrmModule.forRoot({
    //   type: 'mongo',
    //   //   dbName: 'your_database_name',
    //   //   migrations: {
    //   //     path: './src/migrations',
    //   //     pattern: /^[\w-]+\d+\.[jt]s$/, // Specify your migration files pattern
    //   //   },
    // }),

    S3Module.forRootAsync(getConfig('s3', (config) => ({ config }))),

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: YogaDriver,
    //   // driver: ApolloDriver,
    //   // debug: true,
    //   playground: true,
    //   autoSchemaFile: join(process.cwd(), 'files/schema.gql'),
    //   // autoSchemaFile: path.join(__dirname, 'src/schema.gql'),
    //   // sortSchema: true,
    //   // playground: true,
    // }),
    MailerModule.forRootAsync(
      getConfig('mailer', (cnf) => ({
        ...cnf,
        template: {
          dir: `${__dirname}/emails`,
          adapter: new ReactAdapter({
            pretty: isDev,
            // plainText: true,
          }),
          // // adapter: new PugAdapter(),
          // options: {
          //   strict: true,
          // },
        },
      })),
    ),
    // CacheModule.registerAsync(
    //   getConfig('redis', (cnf) => ({
    //     store: redisStore,
    //     ...cnf,
    //   })),
    // ),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),

    // TelegrafModule.forRootAsync(getConfig('telegram', ({ token }) => ({ token }))),
    // TelegrafModule.forRoot({
    //   token: '442648582:AAGAupxQq99r5yutexABJ2-Ks9pc2rnGB7s',
    // }),
  ],
  controllers: [
    //
    // AuthController,
    // ProductController,
    ApiController,
    ProductsController,
    // TelegramAvartarController,
    TestController,
    ListController,
  ],
  providers: [
    // AuthService,
    // AuthOtpService,
    // BotAppService,

    // TODO: подумать
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseTransformInterceptor,
    // },
    // PrevappService,
    // BotService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessLoggerMiddleware).exclude('/api/bots/files/(.*)').forRoutes('*');
  }
}
