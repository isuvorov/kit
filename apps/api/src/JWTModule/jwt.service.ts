import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class JwtService {
  private privateKey: crypto.KeyObject;

  constructor(private readonly jwtService: NestJwtService) {
    const keyPair = crypto.generateKeyPairSync('ed448', {
      publicKeyEncoding: { type: 'spki', format: 'der' },
      privateKeyEncoding: { type: 'pkcs8', format: 'der' },
    });

    this.privateKey = crypto.createPrivateKey(keyPair.privateKey);
  }

  generateAccessToken(payload: Record<string, any>): string {
    const keyAsBuffer = this.privateKey.export({ type: 'pkcs8', format: 'der' });
    const signOptions = {
      algorithm: 'EdDSA',
      key: keyAsBuffer,
      expiresIn: '15m',
    };

    return this.jwtService.sign(payload as Record<string, unknown>, signOptions as any);
  }

  generateRefreshToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
