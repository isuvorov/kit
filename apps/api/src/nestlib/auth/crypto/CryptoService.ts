import { createLogger } from '@lsk4/log';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class CryptoService implements OnModuleInit {
  client: any;
  // TODO: move to config
  saltLength = 16;
  defaultSalt: string;

  log = createLogger(this.constructor.name);

  async onModuleInit() {
    this.client = await this.createClient();
    this.defaultSalt = await this.generateSalt(this.saltLength);
  }

  async createClient() {
    try {
      this.client = await import('./bcrypt.js');
    } catch (err) {
      this.log.trace('bcrypt.js not found, using bcryptjs');
    }
    try {
      this.client = await import('./bcryptjs.js');
    } catch (err) {
      this.log.trace('bcryptjs.js not found, using crypto');
    }
    try {
      this.client = await import('./crypto.js');
    } catch (err) {
      this.log.trace('crypto.js not found, fatal ');
      throw err;
    }
    return null;
  }

  async generateSalt(initLength) {
    const length = initLength || this.saltLength;
    const salt = await this.client.generateSalt(length);
    return salt;
  }
  async hashPassword(password: string, initSalt?: string): Promise<string> {
    const salt = initSalt || this.defaultSalt;
    const hash = await this.client.hashPassword(password, salt);
    return hash;
  }

  async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await this.client.comparePassword(inputPassword, hashedPassword);
    return isMatch;
  }
}
