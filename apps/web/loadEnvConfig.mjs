/* eslint-disable no-continue */
/* eslint-disable import/no-dynamic-require */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { Err } from '@lsk4/err';
import { log } from '@lsk4/log/log';

export const loadEnvConfig = async (filenames, { cwd = process.cwd(), throwError = true } = {}) => {
  try {
    // eslint-disable-next-line no-param-reassign
    const paths = Array.isArray(filenames) ? filenames : [filenames];
    for (let i = 0; i < paths.length; i++) {
      // TODO: may be merge
      let path = paths[i];
      if (!path) continue;
      if (path.startsWith('process.env.')) {
        const envName = path.replace('process.env.', '');
        const raw = process.env[envName];
        if (!raw) continue;
        try {
          const res = JSON.parse(raw);
          return res;
        } catch (err) {
          throw new Err(
            'ENV_VAR_CANNOT_PARSE',
            `ENV_VAR_CANNOT_PARSE(${envName}): ${err?.message}`,
            {
              envName,
            },
          );
        }
      }
      if (path.startsWith('/')) {
        // do nothing
      } else {
        path = join(cwd, path);
      }
      if (!existsSync(path)) continue;
      const config = await import(path);
      if (config?.default) return config.default;
      return config;
    }
    throw new Err('ENV_FILE_NOT_FOUND', { paths });
  } catch (err) {
    if (throwError) throw err;
    log.error('[loadEnvConfig]', err);
    return {};
  }
};

export default loadEnvConfig;
