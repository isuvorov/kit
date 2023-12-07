import { Err } from '@lsk4/err';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { ErrorTransformInterceptor, ResponseTransformInterceptor } from '@/nestlib/interceptors';

@Controller('api/test/err')
@UseInterceptors(new ResponseTransformInterceptor(), new ErrorTransformInterceptor())
export class TestErrController {
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
}
