import { omitNull } from '@lsk4/algos';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service.js';

@Controller()
export class AppController {
  // eslint-disable-next-line no-empty-function
  constructor(private readonly appService: AppService) {}

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
      nodejs,
    });
  }

  @Get('*')
  getHello(): string {
    return this.appService.getHello();
  }
}
