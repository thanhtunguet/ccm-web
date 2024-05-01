import {Field, Model, MomentField} from 'react3l';

import type {Moment} from 'moment';

export class Bank extends Model {
  @Field(Number)
  public id?: number;

  @Field(Number)
  public shortId?: number;

  @Field(String)
  public code?: string;

  @Field(String)
  public shortCode?: string;

  @Field(String)
  public tpBankIdCode?: string;

  @Field(Boolean)
  public napasSupported?: boolean;

  @Field(String)
  public dataType?: string;

  @Field(String)
  public name?: string;

  @Field(String)
  public englishName?: string;

  @Field(String)
  public shortName?: string;

  @Field(String)
  public bin?: string;

  @Field(Number)
  public cardLength?: number;

  @MomentField()
  public createdAt?: Moment;

  @MomentField()
  public updatedAt?: Moment;

  @MomentField()
  public deletedAt?: Moment;

}
