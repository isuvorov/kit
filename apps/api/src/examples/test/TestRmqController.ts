// @ts-nocheck

// import { BotConfigModel } from '@chatterfy/core/models/BotConfigModel.entity';
// import { Logger } from '@lskjs/log';
// import { AuthRole } from '@lskjs/nest-auth';
// import { CacheTTL } from '@nestjs/cache-manager';
// import { Controller, Get } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { delay, map } from 'fishbird';
// import { range } from 'lodash';
// import { Repository } from 'typeorm';

// import { BotsService } from '../chatterfy/core/bots/BotsService';

@Controller('/api/test/rmq')
export class TestRmqController {
  constructor(
    // @Inject('botsQueue') private botsQueue: ClientProxy,
    @InjectRepository(BotConfigModel)
    private dialogRepository: Repository<BotConfigModel>,
    private botsService: BotsService,
  ) {}
  log = new Logger({ name: 'TestSender' });
  logWorker = new Logger({ name: 'TestWorker' });

  @Get('producer')
  async producer() {
    const array = range(100000);
    await map(
      array,
      async (i) => {
        // this.botsQueue.send('test', { test: `test ${i}`, i }).toPromise();
        await delay(1);
      },
      { concurrency: 100 },
    );
    return 'NestApp index';
  }

  // @MessagePattern('test')
  // async consumer(@Payload() data: any, @Ctx() context: RmqContext) {
  //   try {
  //     this.logWorker.debug('consumer', data);
  //     if (Math.random() < 0.1) throw new Err('test');
  //     const res = data.i * data.i;
  //     await delay(1000);
  //     context.getChannelRef().ack(context.getMessage());
  //     return {
  //       res,
  //       text: 'Message Received',
  //     };
  //   } catch (err) {
  //     this.logWorker.error('consumer', err);
  //     context.getChannelRef().nack(context.getMessage());
  //     return {
  //       err,
  //       text: 'Message Received',
  //     };
  //   }
  // }
}
