import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';

import { AuthController, AuthOtpService, AuthService } from '.';
import { CryptoModule } from './crypto/CryptoModule';
import defaultModels from './models';

@Module({
  // import: [],
  // controllers: [AuthController],
  // providers: [CryptoService, AuthOtpService, AuthService],
  // exports: [CryptoService, AuthOtpService, AuthService],
})
export class AuthModule {
  static forRoot({ models = {} }: any = {}): DynamicModule {
    const entities = Object.values({
      ...defaultModels,
      ...models,
    });
    const mirkoormOptions = {
      // TODO: прокинуть типы
      entities,
    } as any;
    return {
      imports: [MikroOrmModule.forFeature(mirkoormOptions), CryptoModule.forRoot()],
      module: AuthModule,
      controllers: [AuthController],
      providers: [AuthOtpService, AuthService],
      exports: [AuthOtpService, AuthService],
    };
  }
}
