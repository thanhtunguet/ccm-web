import {AutoModel, Field, Model} from "react3l";

@AutoModel()
export class Bank extends Model {
    @Field(Number)
  public id?: number;

    @Field(String)
    public code?: string;

    @Field(String)
    public name?: string;

    @Field(String)
    public englishName?: string;

    @Field(String)
    public shortName?: string;
}
