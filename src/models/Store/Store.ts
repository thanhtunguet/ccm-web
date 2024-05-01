import {Field, Model, MomentField} from 'react3l';

import type {Moment} from 'moment';

export class Store extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public code?: string;

  @Field(String)
  public name?: string;

  @MomentField()
  public createdAt?: Moment;

  @MomentField()
  public updatedAt?: Moment;

  @MomentField()
  public deletedAt?: Moment;

  @Field(String)
  public address?: string;
}
