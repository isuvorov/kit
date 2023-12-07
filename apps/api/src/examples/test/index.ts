import { TestAuthController } from './TestAuthController.js';
import { TestBaseController } from './TestBaseController.js';
import { TestCacheController } from './TestCacheController.js';
import { TestErrController } from './TestErrController.js';
import { TestRmqController } from './TestRmqController.js';

export * from './TestAuthController.js';
export * from './TestBaseController.js';
export * from './TestCacheController.js';
export * from './TestErrController.js';
export * from './TestRmqController.js';

export default [
  TestAuthController,
  TestBaseController,
  TestCacheController,
  TestErrController,
  TestRmqController,
];
