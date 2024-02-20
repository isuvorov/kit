import { isDev } from '@lsk4/env';
import { defineConfig } from '@mikro-orm/mongodb';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
// import { DevtoolsModule } from '@nestjs/devtools-integration';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { BotService } from './bot/bot.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { AccessLoggerMiddleware } from '@nestlib/access-logger';
import { AuthGuard, AuthModule, models } from '@nestlib/auth';
import { ConfigModule, getConfig } from '@nestlib/config';
import { loggerFactory } from '@nestlib/mikro-orm';
import { LockModule } from '@nestlib/mutex';
import { UploadService } from '@nestlib/upload';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';
import { S3Module } from 'nestjs-s3';

// import { redisStore } from 'cache-manager-redis-store';]
// import type { RedisClientOptions } from 'redis';
import { ApiController } from './api/ApiController';
import { UploadController } from './api/UploadController';
import { UserListController } from './api/UserListController';
import { ExampleListController } from './examples/ExampleListController';
import testControlers from './examples/test';

const notNull = (v, def) => (v == null ? def : v);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    // LockModule.register({
    //   redisOptions: {
    //     host: '127.0.0.1',
    //     port: '6379',
    //   },
    // }),
    LockModule.register({}),
    // LockModule.registerAsync(
    //   getConfig('redis', (config: any) => ({
    //     redisOptions: {
    //       host: config.host,
    //       port: config.port,
    //     },
    //   })),
    // ),
    // CacheModule.registerAsync(
    //   getConfig('redis', (cnf: RedisClientOptions) => ({
    //     store: (): any =>
    //       redisStore({
    //         socket: {
    //           host: cnf.host,
    //           port: cnf.port,
    //         },
    //       }),
    //   })),
    // ),
    MikroOrmModule.forRootAsync(
      getConfig('dbs.mongodb', (cnf) =>
        defineConfig({
          clientUrl: cnf.uri! as string,
          entities: Object.values(models),
          debug: Boolean(cnf.debug ?? isDev),
          loggerFactory,
          allowGlobalContext: true,
        }),
      ),
    ),
    MikroOrmModule.forFeature({ entities: Object.values(models) }),
    // S3Module.forRootAsync(getConfig('s3', (config) => ({ config }))),
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

    // DevtoolsModule.register({
    //   http: isDev,
    // }),
    // TelegrafModule.forRootAsync(getConfig('telegram', ({ token }) => ({ token }))),
    // TelegrafModule.forRoot({
    //   token: '442648582:AAGAupxQq99r5yutexABJ2-Ks9pc2rnGB7s',
    // }),

    // NOTE: nestlib
    AuthModule.forRoot(),
    S3Module.forRootAsync(getConfig('s3', (config) => ({ config }))),
  ],
  controllers: [
    //
    // AuthController,
    // ProductController,
    // ProductsController,
    // TelegramAvartarController,
    ...testControlers,
    ExampleListController,
    UserListController,
    ApiController,
    UploadController,

    // NOTE: nestlib
    // AuthController,
  ],
  providers: [
    // NOTE: nestlib
    // AuthService,
    // AuthOtpService,
    UploadService,
    // BotAppService,

    // TODO: подумать
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
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
