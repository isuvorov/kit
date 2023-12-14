import { createLogger } from '@lsk4/log';
import { CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor, ResponseInterceptor } from '@nestlib/interceptors';
import { delay } from 'fishbird';

// NOTE: тестируем кеш как-то так
// ab -n 10 -c 1 https://lskjs.ru/
// ab -n 100 -c 10 https://lskjs.ru/
// ab -n 1000 -c 100 https://lskjs.ru/
// по идее при этих 3х запросах максимальное время ответа должен быть плюс минус одно

@Controller('/api/test/cache')
@UseInterceptors(new ResponseInterceptor(), new ErrorInterceptor())
export class TestCacheController {
  log = createLogger(this.constructor.name);

  @Get('index')
  @CacheTTL(60000)
  async index() {
    // NOTE: простой пример кеширования
    const updatedAt = new Date();
    this.log.debug('index', updatedAt);
    return {
      updatedAt,
    };
  }

  @Get('id')
  @CacheTTL(60000)
  async id(@Query('id') id: string) {
    // NOTE: тут нужен пример кеша для id
    const updatedAt = new Date();
    this.log.debug('id', id, updatedAt);
    return {
      id,
      updatedAt,
    };
  }

  @Get('quick')
  @CacheTTL(1000)
  async quick() {
    this.log.debug('quick start');
    // NOTE: эммулируем легкий не критичный запрос
    await delay(100);
    const updatedAt = new Date();
    this.log.debug('quick finish', updatedAt);
    return {
      updatedAt,
    };
  }

  @Get('strange')
  @CacheTTL(1000)
  async strange() {
    this.log.debug('strange start');
    // NOTE: странный кейс при котором мы поствили кеш ниже чем долгий запрос, по идее метод должен подтротливать, и возможно в таких случаях надо дать возможность через опцию возвращать не актуальный кеш,
    // NOTE: те надо придумать какой-то параметр, который говорит через сколько кеш хотелось бы обновить, но не критично что отдается старый
    await delay(10000);
    const updatedAt = new Date();
    this.log.debug('strange finish', updatedAt);
    return {
      updatedAt,
    };
  }

  @Get('products')
  @CacheTTL(60000)
  async products() {
    this.log.debug('products start');
    // NOTE: эммулируем долгий запрос, очень не хотелось бы чтобы в похожих параллельных запросах мы утонули. примерно как в proxy
    // NOTE: в альфреде я вешаю @Lock, но кажется это не самая хорошая идея, и наверное как-то кеш сам должен уметь
    await delay(15000);
    const updatedAt = new Date();
    this.log.debug('products finish', updatedAt);
    return {
      updatedAt,
    };
  }
}
