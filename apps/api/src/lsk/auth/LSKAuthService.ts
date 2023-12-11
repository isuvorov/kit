import { Err } from '@lsk4/err';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { AuthService } from '@/nestlib/auth';
import { UserModel } from '@/nestlib/auth/models/UserModel';

import { LSKUserModel } from './LSKUserModel';

@Injectable()
export class LSKAuthService extends AuthService {
  constructor(
    @InjectRepository(LSKUserModel)
    usersRepository: EntityRepository<UserModel | LSKUserModel>,
  ) {
    super(usersRepository);
  }
}
