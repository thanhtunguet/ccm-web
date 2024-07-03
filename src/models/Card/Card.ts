import type { Moment } from "moment";
import { Field, Model, MomentField } from "react3l";
import { CardClass } from "../CardClass";
import { Customer } from "../Customer";
import { Transaction } from "../Transaction";


export class Card extends Model {
    @Field(Number)
  public id?: number;

    @Field(String)
    public number?: string;

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

    public cardClass?: CardClass;

    @Field(Number)
    public customerId?: number;

    @MomentField()
    public createdAt?: Moment;

    @MomentField()
    public updatedAt?: Moment;

    @MomentField()
    public deletedAt?: Moment;

    public customer?: Customer;

    public transactions?: Transaction[];
}
