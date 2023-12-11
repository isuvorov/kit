import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

import { UserModel } from '@/nestlib/auth/models/UserModel';

@Entity({ tableName: 'auth_user' })
export class LSKUserModel extends UserModel {}
