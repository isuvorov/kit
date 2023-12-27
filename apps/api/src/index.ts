import 'source-map-support/register';
import './main.js';

import { createLogger } from '@lsk4/log';

const log = createLogger('main');

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  log.error('[uncaughtException]', err, err.stack);
});
