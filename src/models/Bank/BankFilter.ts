import {AutoModel, DateFilter, IdFilter, ModelFilter, NumberFilter, ObjectField, StringFilter} from "react3l";

@AutoModel()
export class BankFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public code?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public dataType?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public englishName?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public shortName?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public bin?: StringFilter = new StringFilter();

  @ObjectField(NumberFilter)
  public cardLength?: NumberFilter = new NumberFilter();

  @ObjectField(DateFilter)
  public createdAt?: DateFilter = new DateFilter();

  @ObjectField(DateFilter)
  public updatedAt?: DateFilter = new DateFilter();

  public search?: string;
}
