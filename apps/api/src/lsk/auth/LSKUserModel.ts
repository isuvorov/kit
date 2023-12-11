import { Entity, Property } from '@mikro-orm/core';

import { UserModel } from '@/nestlib/auth/models/UserModel';

@Entity({ tableName: 'auth_user' })
export class LSKUserModel extends UserModel {
  @Property({ onUpdate: () => new Date() })
  updatedAt2: Date = new Date();
}
