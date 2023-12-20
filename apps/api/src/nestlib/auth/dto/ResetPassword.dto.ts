import { IsNotEmpty, IsString } from 'class-validator';

import { ToLowerCase } from '@/nestlib/decorators/transformers/ToLowerCase.decorator';
import { Trim } from '@/nestlib/decorators/transformers/Trim.decorator';

export class ResetPasswordDTO {
  @IsString()
  @Trim()
  @IsNotEmpty()
  @ToLowerCase()
  otpId: string;

  @IsString()
  @Trim()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
