import { Expose, Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class ExampleFilter {
  @IsString()
  @IsOptional()
  role: string;
}
