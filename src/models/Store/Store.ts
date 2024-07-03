import type { Moment } from "moment";
import { Field, Model, MomentField } from "react3l";


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

  @Field(String)
  public address?: string;
}
