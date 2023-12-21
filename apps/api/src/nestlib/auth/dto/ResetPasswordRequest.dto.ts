import { IsEmail, IsNotEmpty } from 'class-validator';

import { ToLowerCase } from '@/nestlib/decorators/transformers/ToLowerCase.decorator';
import { Trim } from '@/nestlib/decorators/transformers/Trim.decorator';

export class ResetPasswordRequestDTO {
  @IsNotEmpty()
  @Trim()
  @ToLowerCase()
  @IsEmail()
  email: string;
}
