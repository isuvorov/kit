import { stage } from '@lsk4/env';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World from API: ${stage}`;
  }
}
