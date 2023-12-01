import { Err } from '@lsk4/err';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Exclude, plainToInstance, Type } from 'class-transformer';
import { IsNumber, Max, Min, validate } from 'class-validator';

export class Find<Filter = any> {
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsNumber()
  skip: number = 0;

  @Exclude()
  filter?: Filter;

  sort: any;
}

export const FindParams = createParamDecorator(async (args: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const data = { ...request.query, ...request.body };
  const { filter = {} } = data;
  const findParams = plainToInstance(Find, data, { enableImplicitConversion: true });
  let filterValidated = [];
  if (args?.filterDto) {
    // @ts-ignore
    findParams.filter = plainToInstance(args.filterDto, filter, { enableImplicitConversion: true });
    filterValidated = await validate(findParams.filter);
  }
  const validated = [...(await validate(findParams)), ...filterValidated];
  if (validated.length) {
    console.log(validated);
    throw new Err('Validation Error', {
      status: 401,
    });
  }
  return findParams;
});
