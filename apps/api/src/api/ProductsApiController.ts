import { omitNull } from '@lsk4/algos';
import { isDev, stage } from '@lsk4/env';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { ResponseTransformInterceptor } from '@/nestlib/ResponseTransformInterceptor';

@Controller('/api/products')
@UseInterceptors(new ResponseTransformInterceptor())
export class ProductsApiController {
  constructor() {}

  @Get('/api/healthcheck')
  async healthcheck() {
    const nodejs = await new Promise((resolve) => {
      const start = Date.now();
      process.nextTick(() => {
        resolve(Date.now() - start);
      });
    });
    return omitNull({
      status: 'ok',
      stage,
      isDev,
      metrics: {
        nodejs,
      },
    });
  }

  @Get('/list')
  list(): string {
    return 'Hello world';
  }
}
