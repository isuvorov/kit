import { Err } from '@lsk4/err';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor, ResponseInterceptor } from '@nestlib/interceptors';

@Controller('/api/test/err')
@UseInterceptors(new ResponseInterceptor(), new ErrorInterceptor())
export class TestErrController {
  // TODO: у всех ошибок один и тот же стандартный response nest.js

  @Get('/0')
  err0() {
    throw 'TEST_ERROR_CODE';
  }

  @Get('/1')
  err1() {
    throw new Err('TEST_ERROR_CODE');
  }

  @Get('/2')
  err2() {
    throw { code: 'TEST_ERROR_CODE', message: 'The message text' };
  }

  @Get('/3')
  err3() {
    throw new Error('The message text');
  }

  @Get('/4')
  err4() {
    throw new Error('TEST_ERROR_CODE');
  }

  @Get('/5')
  err5() {
    const error = new Error('The message text');
    // @ts-ignore
    error.code = 'TEST_ERROR_CODE';
    throw error;
  }

  @Get('/6')
  err6() {
    throw {};
  }

  @Get('/7')
  err7() {
    throw null;
  }

  @Get('/10')
  err10() {
    throw new Err();
  }

  @Get('/11')
  err11() {
    throw new Err('TEST_ERROR_CODE');
  }

  @Get('/12')
  err12() {
    throw new Err('TEST_ERROR_CODE', { message: 'The message text' });
  }

  @Get('/13')
  err13() {
    throw new Err('TEST_ERROR_CODE', { message: 'The message text' }, { status: 404 });
  }

  @Get('/14')
  err14() {
    throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
  }

  @Get('/15')
  err15() {
    throw new Err('test.someError', { status: 404 });
  }

  @Get('/16')
  err16() {
    throw new Err('test.anotherError', { status: 404, data: { hello: 'world' } });
  }

  @Get('/17')
  err17() {
    // @ts-ignore
    throw new Error('err', 'file', 123);
  }

  @Get('/18')
  err18() {
    throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
  }

  @Get('/19')
  err19() {
    throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
  }

  @Get('/20')
  err20() {
    throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
  }

  @Get('/21')
  err21() {
    throw new Err('user.notFound', { status: 404 });
  }

  @Get('/21')
  err22() {
    throw new Err('some.error', { status: 404 });
  }

  @Get('/24')
  err24() {
    throw new Err('some.error', { status: 404 });
  }
}
