import {Field, Model} from 'react3l';

export class TransactionStatus extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public code?: string;

  @Field(String)
  public name?: string;

  @Field(String)
  public color?: string;

}
