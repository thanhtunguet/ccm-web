import type { Moment } from "moment";
import { Field, Model, MomentField } from "react3l";
import { Card } from "../Card";


export class Customer extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public displayName?: string;

  @Field(String)
  public email?: string;

  @Field(String)
  public address?: string;

  @Field(String)
  public phoneNumber?: string;

  @MomentField()
  public createdAt?: Moment;

  @MomentField()
  public updatedAt?: Moment;

  @MomentField()
  public deletedAt?: Moment;

  public cards?: Card[];
}
