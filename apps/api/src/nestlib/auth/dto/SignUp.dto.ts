import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ToLowerCase } from '@/nestlib/decorators/transformers/ToLowerCase.decorator';
import { Trim } from '@/nestlib/decorators/transformers/Trim.decorator';

export class SignUpDTO {
  @IsNotEmpty()
  @Trim()
  @ToLowerCase()
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  tos: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;
}
