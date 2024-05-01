import {Field, Model, MomentField} from 'react3l';

import type {Moment} from 'moment';

import {TransactionStatus} from 'src/models/TransactionStatus';

import {Store} from 'src/models/Store';

export class Transaction extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public code?: string;

  @Field(Number)
  public cardId?: number;

  @Field(Number)
  public amount?: number;

  @Field(Number)
  public transactionFee?: number;

  @Field(Number)
  public statusId?: number;

  @MomentField()
  public createdAt?: Moment;

  @MomentField()
  public updatedAt?: Moment;

  @MomentField()
  public deletedAt?: Moment;

  @Field(Number)
  public storeId?: number;

  public status?: TransactionStatus;

  public store?: Store;

}
