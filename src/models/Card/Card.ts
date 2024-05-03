import { Field, Model, MomentField } from "react3l";

import type { Moment } from "moment";

export class Card extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public cardNumber?: string;

  @Field(String)
  public name?: string;

  @Field(String)
  public sampleLink?: string;

  @Field(String)
  public benefits?: string;

  @Field(String)
  public description?: string;

  @Field(String)
  public bin?: string;

  @Field(Number)
  public cardClassId?: number;

  @Field(Number)
  public customerId?: number;

  @MomentField()
  public createdAt?: Moment;

  @MomentField()
  public updatedAt?: Moment;

  @MomentField()
  public deletedAt?: Moment;
}
