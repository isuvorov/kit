import { omitNull } from '@lsk4/algos';
import { isDev, stage } from '@lsk4/env';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { ErrorTransformInterceptor, ResponseTransformInterceptor } from '@/nestlib/interceptors';

@Controller()
@UseInterceptors(new ResponseTransformInterceptor(), new ErrorTransformInterceptor())
export class ApiController {
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
  // @Get('*')
  // getHello(): string {
  //   return 'Hello world';
  // }
}
