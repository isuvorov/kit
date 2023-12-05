import { Logger as LskLogger } from '@lsk4/log';
import { LogContext, Logger, LoggerNamespace, LoggerOptions } from '@mikro-orm/core';

export const mikroOrmLoggerFactory = (options: LoggerOptions): Logger => {
  // console.log('MikroOrmModule', { options });
  const log = new LskLogger('MikroOrmModule');
  return {
    logQuery(context: LogContext) {
      log.trace(`[${'query'}]`, context.query, context.params);
    },
    log(namespace: LoggerNamespace, message: string) {
      log.debug(`[${namespace}]`, message);
    },
    error(namespace: LoggerNamespace, message: string) {
      log.error(`[${namespace}]`, message);
    },
    warn(namespace: LoggerNamespace, message: string) {
      log.warn(`[${namespace}]`, message);
    },
    setDebugMode() {},
    isEnabled() {
      return true;
    },
  };
};
