import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AuthRole, IsAuth, IsPublic } from '@nestlib/auth';
import { ErrorInterceptor, ResponseInterceptor } from '@nestlib/interceptors';

// // TODO: проверить работу доступов на контроллере
// @IsAuth()

@Controller('/api/test/auth')
@UseInterceptors(new ResponseInterceptor(), new ErrorInterceptor())
export class TestAuthController {
  @Get('public')
  @IsPublic()
  async public() {
    return {
      test: 'ok',
    };
  }

  @Get('auth')
  @IsAuth()
  async auth() {
    return {
      test: 'ok',
    };
  }

  @Get('admin')
  @AuthRole(AuthRole.admin, AuthRole.developer)
  // @AuthRole(Roles.companyManager)
  async admin() {
    return {
      test: 'ok',
    };
  }
}
