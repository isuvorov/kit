import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ tableName: 'billing_transaction' })
export class TransactionModel {
  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  userId!: string;

  @Property()
  role!: string;

  // topup, out, internal
  @Property()
  type!: string;

  // bank, g2a, yoomoney,  etc.
  @Property()
  provider!: string;

  // RUB, USD, BTC, LSKCOIN, BGCOIN
  @Property()
  currency!: string;

  @Property()
  amount!: number;

  // null, progress, succcess, error
  @Property()
  status!: string;

  @Property()
  meta!: any;
}
