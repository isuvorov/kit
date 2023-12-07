import { createLogger } from '@lsk4/log';
import { CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { delay } from 'fishbird';

import { ErrorTransformInterceptor, ResponseTransformInterceptor } from '@/nestlib/interceptors';

@Controller('/api/test/cache')
@UseInterceptors(new ResponseTransformInterceptor(), new ErrorTransformInterceptor())
export class TestCacheController {
  log = createLogger(this.constructor.name);

  @Get('products')
  @CacheTTL(1000)
  async products() {
    this.log.debug('products start');
    // NOTE: эммулируем долгий запрос
    await delay(15000);
    const res = new Date();
    this.log.debug('products finish', res);
    return {
      res,
    };
  }
}
