import { isPlainObject, omit } from '@lsk4/algos';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((raw) => {
        let isJson: boolean;
        let resultWrap;
        let data;
        if (typeof raw?.__raw !== 'undefined') {
          resultWrap = false;
          isJson = false;
          data = raw.__raw;
        } else {
          resultWrap = !(raw?.__pack ?? false);
          isJson = true;
          if (isPlainObject(raw)) {
            data = omit(raw, ['__pack', '__raw', '__log', '__status']);
          } else if (raw instanceof Error) {
            throw raw;
          } else if (typeof raw === 'function') {
            data = {};
          } else {
            data = raw;
          }
        }
        if (!data) data = {};
        const code = resultWrap ? data.code : data.code;
        let message = resultWrap ? data.message : data.message;
        if (message === code) message = undefined;
        let result;
        let resultType;
        if (resultWrap) {
          resultType = 'object';
          result = {
            ok: 1,
            code,
            message,
            data,
          };
        } else if (typeof data === 'string') {
          resultType = 'string';
          result = data;
          // TODO: other types
        } else {
          resultType = 'object';
          result = {
            ...data,
            code,
            message,
          };
        }
        if (!isJson) {
          return result;
        }
        if (!context.switchToHttp().getResponse().getHeader('content-type')) {
          context.switchToHttp().getResponse().setHeader('content-type', 'application/json');
        }
        if (resultType === 'string') return result;
        // TODO: fast-safe-stringify?
        return JSON.stringify(result);
      }),
    );
  }
}
