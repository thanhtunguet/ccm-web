import { Field, Model } from "react3l";


export class TransactionStatus extends Model {
  public static readonly DONE = 2;

  public static readonly PENDING = 1;

  @Field(Number)
  public id?: number;

  @Field(String)
  public code?: string;

  @Field(String)
  public name?: string;

  @Field(String)
  public color?: string;
}
