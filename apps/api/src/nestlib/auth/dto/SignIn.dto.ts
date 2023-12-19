import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ToLowerCase } from '@/nestlib/decorators/transformers/ToLowerCase.decorator';
import { Trim } from '@/nestlib/decorators/transformers/Trim.decorator';

export class SignInDTO {
  @IsNotEmpty()
  @Trim()
  @ToLowerCase()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
