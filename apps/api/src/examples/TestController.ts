import { Err } from '@lsk4/err';
import { All, Controller, Get, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { delay } from 'fishbird';

import { ErrorTransformInterceptor, ResponseTransformInterceptor } from '@/nestlib/interceptors';

@Controller('api/test')
@UseInterceptors(new ResponseTransformInterceptor(), new ErrorTransformInterceptor())
export class TestController {
  constructor() {}

  // TODO: middleware in request
  @Get('/middleware/1')
  middleware1() {
    return 123;
  }

  // TODO: middleware before request
  @Get('/middleware/2')
  middleware2() {
    return 123;
  }

  @Get('/res/1')
  res1() {
    return 123;
  }

  @Get('/res/2')
  res2() {
    return 'Hello';
  }

  @Get('/res/3')
  res3(@Res() res: Response) {
    return res.send('hello');
  }

  @Get('/res/4')
  res4() {
    return {
      test: 123,
    };
  }

  @Get('/res/5')
  res5() {
    return [1, 2, 3, 4];
  }

  @Get('/res/6')
  res6() {
    return true;
  }

  @Get('/res/7')
  res7() {
    return null;
  }

  @Get('/res/8')
  res8() {
    return undefined;
  }

  @Get('/res/9')
  res9() {
    return () => {};
  }

  @Get('/res/10')
  res10() {
    return /[0-9]ig/;
  }

  @Get('/res/11')
  res11() {
    return { __raw: '<html />' };
  }

  @Get('/res/12')
  res12() {
    return { __pack: true, some: 123, help: 'me' };
  }

  @Get('/res/13')
  res13() {
    return function some() {
      const secret = 123;
      return secret;
    };
  }

  @Get('/async/ok')
  async asyncOk() {
    const delayTime = 5000;
    await delay(delayTime);
    return { delay: delayTime };
  }

  @Get('/async/err')
  async asyncErr() {
    const delayTime = 5000;
    await delay(delayTime);
    throw new Err('ERR_QWE', { delay: delayTime });
  }

  // TODO: не работает присваивание статуса
  @Get('/async/404')
  async async404() {
    const delayTime = 5000;
    await delay(delayTime);
    throw new Err('ERR_QWE', { delay: delayTime, status: 404 });
  }

  // TODO: не работает присваивание статуса
  @Get('/async/502')
  async async502() {
    const delayTime = 5000;
    await delay(delayTime);
    throw new Err('ERR_QWE', { delay: delayTime, status: 502 });
  }

  // TODO: у всех ошибок один и тот же стандартный response nest.js

  @Get('/err/1')
  err1() {
    throw new Err('TEST_ERROR_CODE');
  }

  @Get('/err/2')
  err2() {
    throw { code: 'TEST_ERROR_CODE', message: 'The message text' };
  }

  @Get('/err/3')
  err3() {
    throw new Error('The message text');
  }

  @Get('/err/4')
  err4() {
    throw new Error('TEST_ERROR_CODE');
  }

  @Get('/err/5')
  err5() {
    const error = new Error('The message text');
    // @ts-ignore
    error.code = 'TEST_ERROR_CODE';
    throw new Error('The message text');
  }

  @Get('/err/6')
  err6() {
    throw {};
  }

  @Get('/err/7')
  err7() {
    throw null;
  }

  @Get('/err/10')
  err10() {
    throw new Err();
  }

  @Get('/err/11')
  err11() {
    throw new Err('TEST_ERROR_CODE');
  }

  @Get('/err/12')
  err12() {
    throw new Err('TEST_ERROR_CODE', { message: 'The message text' });
  }

  @Get('/err/13')
  err13() {
    throw new Err('TEST_ERROR_CODE', { message: 'The message text' }, { status: 404 });
  }

  @Get('/err/14')
  err14() {
    throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
  }

  @Get('/err/15')
  err15() {
    throw new Err('test.someError', { status: 404 });
  }

  @Get('/err/16')
  err16() {
    throw new Err('test.anotherError', { status: 404, data: { hello: 'world' } });
  }

  @Get('/err/17')
  err17() {
    // @ts-ignore
    throw new Error('err', 'file', 123);
  }

  @Get('/err/18')
  err18() {
    throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
  }

  @Get('/err/19')
  err19() {
    throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
  }

  @Get('/err/20')
  err20() {
    throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
  }

  @Get('/err/21')
  err21() {
    throw new Err('user.notFound', { status: 404 });
  }

  @Get('/err/21')
  err22() {
    throw new Err('some.error', { status: 404 });
  }

  @Get('/err/24')
  err24() {
    throw new Err('some.error', { status: 404 });
  }

  // TODO: сделать прокидывание параметров из GET и POST в один декоратор
  @All('/form')
  form() {
    return null;
  }

  // TODO: { locale: req.getLocale(), test: req.t('test.hello') }
  @Get('/locale')
  locale() {
    return null;
  }

  // TODO: collectConfigs(this.app)
  @Get('/app/config')
  appConfig() {
    return null;
  }

  // TODO: collectConfigsLog(this.app)
  @Get('/app/config/log')
  appConfigLog() {
    return null;
  }

  // TODO: req.user
  @Get('/req/auth')
  @Get('/req/user')
  reqAuth() {
    return null;
  }

  @Get('/req/userId')
  reqUserId() {
    return null;
  }

  // TODO: log body
  @Get('/req/:log?')
  reqLog() {
    return null;
  }

  // TODO: get user
  @Get('/user/one')
  userOne() {
    return null;
  }

  // TODO: paths
  @Get('/path/*')
  paths() {
    return null;
  }
}
