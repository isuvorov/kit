// eslint-disable-next-line max-classes-per-file
import { Embeddable, Embedded, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Optional } from '@nestjs/common';

@Embeddable()
export class Info {
  @Optional()
  @Property()
  firstName?: string;

  @Property()
  @Optional()
  lastName?: string;

  @Property()
  @Optional()
  avatar?: string;
}

@Entity({ tableName: 'auth_user' })
export class UserModel {
  @PrimaryKey({ name: '_id', hidden: false })
  _id!: ObjectId;

  @Property()
  email!: string;

  @Property()
  role!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  companyId!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Embedded(() => Info, { object: true })
  info?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };

  @Property()
  statuses?: {
    emailConfirmedAt?: Date;
    loginedAt?: Date;
    editedAt?: Date;
    activityAt?: Date;
    passwordAt?: Date;
    blockedAt?: Date;
  };
}
