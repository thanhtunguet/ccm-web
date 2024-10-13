import type { Moment } from "moment";
import { Field, Model, MomentField } from "react3l";


export class Store extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public code?: string;

  @Field(String)
  public name?: string;

  @Field(Number)
  public fee?: number;

  @Field(String)
  public address?: string;

  @MomentField()
  public createdAt?: Moment;

  @MomentField()
  public updatedAt?: Moment;
}
