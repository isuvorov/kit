import { isDev } from '@lsk4/env';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
// import { DevtoolsModule } from '@nestjs/devtools-integration';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { BotService } from './bot/bot.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { AccessLoggerMiddleware } from '@nestlib/access-logger';
import { AuthGuard, AuthModule, models } from '@nestlib/auth';
import { ConfigModule, getConfig, loadConfigEnvs } from '@nestlib/config';
import { loggerFactory } from '@nestlib/mikro-orm';
import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';

// import { redisStore } from 'cache-manager-redis-store';
// import type { RedisClientOptions } from 'redis';
import { ApiController } from './api/ApiController';
import testControlers from './examples/test';

const notNull = (v, def) => (v == null ? def : v);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env', '../.env', '../../.env'],
    }),
    ConfigModule.forRoot(
      loadConfigEnvs(['process.env.ENV_JSON', '.env.cjs', '../.env.cjs', '../../.env.cjs']),
    ),
    CacheModule.register(),
    // CacheModule.registerAsync(
    //   getConfig('dbs.mongodb', (cnf: RedisClientOptions) => ({
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
      getConfig('dbs.mongodb', (cnf) => ({
        type: 'mongo',
        clientUrl: cnf.uri,
        entities: Object.values(models),
        debug: notNull(cnf.debug, isDev),
        loggerFactory,
      })),
    ),
    // MikroOrmModule.forFeature({ entities: models }),
    // MikroOrmModule.forFeature({ entities: Object.values(models) }),
    // MikroOrmModule.forRoot({ entities: Object.values(models) }),

    // MikroOrmModule.forRoot({
    //   type: 'mongo',
    //   //   dbName: 'your_database_name',
    //   //   migrations: {
    //   //     path: './src/migrations',
    //   //     pattern: /^[\w-]+\d+\.[jt]s$/, // Specify your migration files pattern
    //   //   },
    // }),

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
  ],
  controllers: [
    //
    // AuthController,
    // ProductController,
    // ProductsController,
    // TelegramAvartarController,
    ...testControlers,
    // ExampleListController,
    // UserListController,
    ApiController,

    // NOTE: nestlib
    // AuthController,
  ],
  providers: [
    // NOTE: nestlib
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
