/* eslint-disable max-classes-per-file */
// import { omitNull } from '@lskjs/algos/omitNull';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsNumberString, IsOptional } from 'class-validator';

import { toBoolean, toDate, toLowerCase, toNumber, trim } from './transformers';

export class ExampleQueryDto {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  public page: number = 1;

  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  public foo: boolean = false;

  @Transform(({ value }) => trim(value))
  @IsOptional()
  public bar: string;

  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  public elon: string;

  @IsNumberString()
  @IsOptional()
  public musk: string;

  @Transform(({ value }) => toDate(value))
  @IsDate()
  @IsOptional()
  public date: Date;
}
