import {Field, Model, MomentField} from 'react3l';

import type {Moment} from 'moment';

import {Bank} from 'src/models/Bank';

export class CardClass extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public code?: string;

  @Field(String)
  public name?: string;

  @Field(Number)
  public dueDate?: number;

  @Field(Number)
  public statementDate?: number;

  @Field(Number)
  public freePeriod?: number;

  @Field(String)
  public color?: string;

  @MomentField()
  public createdAt?: Moment;

  @MomentField()
  public updatedAt?: Moment;

  @MomentField()
  public deletedAt?: Moment;

  @Field(Number)
  public bankId?: number;

  @Field(String)
  public sampleLink?: string;

  @Field(Number)
  public interest?: number;

  @Field(String)
  public bankShortName?: string;

  @Field(String)
  public bankName?: string;

  public bank?: Bank;

}
