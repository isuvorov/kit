import { Module } from '@nestjs/common';

import { AuthController, AuthOtpService, AuthService } from '.';
// import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from './crypto/CryptoService';

@Module({
  // import: [],
  controllers: [AuthController],
  providers: [CryptoService, AuthOtpService, AuthService],
  exports: [CryptoService, AuthOtpService, AuthService],
})
export class AuthModule {
  constructor(private cryptoService: CryptoService) {}
}
