import {AutoModel, Field, Model} from "react3l";
import { CardClass } from "../CardClass";

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

    public cardClasses?: CardClass[];
}
