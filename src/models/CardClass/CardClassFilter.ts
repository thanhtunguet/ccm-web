import { DateFilter, IdFilter, ModelFilter, NumberFilter, ObjectField, StringFilter } from "react3l";

export class CardClassFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public code?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();

  @ObjectField(NumberFilter)
  public dueDate?: NumberFilter = new NumberFilter();

  @ObjectField(NumberFilter)
  public statementDate?: NumberFilter = new NumberFilter();

  @ObjectField(NumberFilter)
  public freePeriod?: NumberFilter = new NumberFilter();

  @ObjectField(DateFilter)
  public createdAt?: DateFilter = new DateFilter();

  @ObjectField(DateFilter)
  public updatedAt?: DateFilter = new DateFilter();

  @ObjectField(IdFilter)
  public bankId?: IdFilter = new IdFilter();

  public search?: string;
}
