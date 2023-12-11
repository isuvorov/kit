import { Inject } from '@nestjs/common';

export const InjectRepo = (name: string) => Inject(`${name}Repository`);
